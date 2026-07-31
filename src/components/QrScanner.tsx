import { useCallback, useEffect, useRef, useState } from "react";
import { Html5Qrcode, Html5QrcodeScannerState } from "html5-qrcode";

interface QrScannerProps {
  /** Called once when a QR/barcode is successfully decoded */
  onScanSuccess: (decodedText: string) => void;
  /** Optional error callback — fires on every failed frame (noisy, use sparingly) */
  onScanError?: (errorMessage: string) => void;
  /** Width of the scanning region in px (default 250) */
  qrboxSize?: number;
  /** Frames per second for the scanner (default 10) */
  fps?: number;
  /** CSS class for the outer container */
  className?: string;
}

type CameraError = "permission" | "notfound" | "unknown" | null;

/**
 * Reusable QR code scanner component powered by html5-qrcode.
 *
 * - Requests camera permission on mount (tries rear camera first, falls back
 *   to the front camera on desktop/machines without an "environment" camera)
 * - Renders a live camera feed inside the container (fills the container)
 * - Calls `onScanSuccess` exactly once per scan (auto-pauses after detection)
 * - Properly cleans up the camera stream on unmount to prevent leaks
 *
 * Design note: The parent component should overlay its own UI (corner brackets,
 * scan lines, etc.) on top of this component using absolute positioning.
 */
export default function QrScanner({
  onScanSuccess,
  onScanError,
  qrboxSize = 250,
  fps = 10,
  className = "",
}: QrScannerProps) {
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [cameraError, setCameraError] = useState<CameraError>(null);
  const [cameraReady, setCameraReady] = useState(false);
  const [retryKey, setRetryKey] = useState(0);
  const hasScannedRef = useRef(false);

  const startCamera = useCallback(
    async (facingMode: "environment" | "user"): Promise<void> => {
      if (!scannerRef.current) return;

      await scannerRef.current.start(
        { facingMode },
        {
          fps,
          // qrbox sized relative to the live video so the box always fits
          qrbox: (width: number, height: number) => {
            const min = Math.min(width, height);
            const size = Math.min(qrboxSize, Math.floor(min * 0.8));
            return { width: size, height: size };
          },
          videoConstraints: {
            facingMode,
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
        },
        (decodedText) => {
          // Only fire the callback once per scanning session
          if (!hasScannedRef.current) {
            hasScannedRef.current = true;
            onScanSuccess(decodedText);
          }
        },
        (errorMessage) => {
          // This fires on every frame that doesn't contain a valid code —
          // we only forward it if the parent explicitly wants it
          onScanError?.(errorMessage);
        }
      );
    },
    [fps, onScanError, onScanSuccess, qrboxSize]
  );

  useEffect(() => {
    const containerId = "qr-scanner-container";

    // Ensure the container div has the expected id for html5-qrcode
    if (containerRef.current) {
      containerRef.current.id = containerId;
    }

    const scanner = new Html5Qrcode(containerId);
    scannerRef.current = scanner;
    let cancelled = false;

    const classifyError = (err: unknown): CameraError => {
      const name = err instanceof Error ? err.name : "";
      if (name === "NotAllowedError" || name === "SecurityError") return "permission";
      if (name === "NotFoundError" || name === "DevicesNotFoundError") return "notfound";
      return "unknown";
    };

    (async () => {
      try {
        await startCamera("environment");
      } catch {
        // Some desktops / browsers only expose a front camera — retry with it.
        try {
          await startCamera("user");
        } catch (err) {
          if (cancelled) return;
          setCameraError(classifyError(err));
        }
      }
    })();

    // If the start promise is slow, reveal the feed once ready anyway so the
    // "Starting camera…" overlay never blocks the view permanently.
    const readyTimer = window.setTimeout(() => setCameraReady(true), 1500);

    return () => {
      cancelled = true;
      window.clearTimeout(readyTimer);
      if (
        scannerRef.current &&
        scannerRef.current.getState() === Html5QrcodeScannerState.SCANNING
      ) {
        scannerRef.current
          .stop()
          .then(() => scannerRef.current?.clear())
          .catch((err: unknown) =>
            console.warn("QR Scanner cleanup error:", err)
          );
      }
    };
  }, [retryKey, startCamera]);

  // Make the injected <video> fill its container (library sometimes keeps
  // a smaller intrinsic size, which leaves black bars).
  useEffect(() => {
    if (!cameraReady) return;
    const video = containerRef.current?.querySelector("video");
    if (video) {
      video.style.width = "100%";
      video.style.height = "100%";
      video.style.objectFit = "cover";
    }
  }, [cameraReady]);

  const errorState = cameraError !== null;

  if (errorState) {
    const copy =
      cameraError === "permission"
        ? {
            title: "Camera access denied",
            hint: "Please allow camera access in your browser settings to scan QR codes.",
          }
        : cameraError === "notfound"
          ? {
              title: "No camera found",
              hint: "No camera was detected on this device. Use the manual entry option below.",
            }
          : {
              title: "Could not start camera",
              hint: "The camera could not be started. Close other apps using the camera and try again.",
            };

    return (
      <div
        className={className}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0D0D0D",
          color: "#ffffff",
          padding: "24px",
          textAlign: "center",
          gap: "12px",
          minHeight: "300px",
        }}
      >
        <p style={{ fontSize: "15px", fontWeight: 600, margin: 0 }}>{copy.title}</p>
        <p style={{ fontSize: "13px", color: "#aaaaaa", maxWidth: "280px", margin: 0 }}>
          {copy.hint}
        </p>
        {cameraError !== "notfound" && (
          <button
            type="button"
            onClick={() => {
              setCameraError(null);
              setCameraReady(false);
              setRetryKey((k) => k + 1);
            }}
            style={{
              marginTop: "8px",
              padding: "10px 24px",
              background: "#3c7443",
              color: "#ffffff",
              border: "none",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Try Again
          </button>
        )}
      </div>
    );
  }

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }} className={className}>
      {/*
        html5-qrcode injects the video element inside this div.
        We keep it unstyled so the library can manage its own layout,
        then the parent overlays its custom scan UI on top.
      */}
      <div
        ref={containerRef}
        style={{
          width: "100%",
          height: "300px",
          background: "#0D0D0D",
        }}
      />

      {/* Loading indicator shown while camera is initialising */}
      {!cameraReady && !errorState && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#0D0D0D",
            color: "#aaaaaa",
            fontSize: "14px",
          }}
        >
          Starting camera…
        </div>
      )}
    </div>
  );
}
