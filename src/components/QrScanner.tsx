import { useEffect, useRef, useState } from "react";
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

/**
 * Reusable QR code scanner component powered by html5-qrcode.
 * 
 * - Requests camera permission on mount
 * - Renders a live camera feed inside the container
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
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);

  /*
   * We use a ref to track whether we've already fired the success callback.
   * This prevents duplicate scans when the same QR code stays in frame
   * across multiple decoded frames.
   */
  const hasScannedRef = useRef(false);

  useEffect(() => {
    const containerId = "qr-scanner-container";

    // Ensure the container div has the expected id for html5-qrcode
    if (containerRef.current) {
      containerRef.current.id = containerId;
    }

    const scanner = new Html5Qrcode(containerId);
    scannerRef.current = scanner;

    scanner
      .start(
        { facingMode: "environment" }, // Prefer rear camera on mobile
        { fps, qrbox: { width: qrboxSize, height: qrboxSize } },
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
      )
      .then(() => {
        setCameraReady(true);
      })
      .catch(() => {
        setPermissionDenied(true);
      });

    // Cleanup: stop the camera when the component unmounts
    return () => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (permissionDenied) {
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
        <p style={{ fontSize: "15px", fontWeight: 600 }}>
          Camera access denied
        </p>
        <p style={{ fontSize: "13px", color: "#aaaaaa", maxWidth: "280px" }}>
          Please allow camera access in your browser settings to scan QR codes.
        </p>
      </div>
    );
  }

  return (
    <div style={{ position: "relative" }} className={className}>
      {/* 
        html5-qrcode injects the video element inside this div.
        We keep it unstyled so the library can manage its own layout,
        then the parent overlays its custom scan UI on top.
      */}
      <div
        ref={containerRef}
        style={{
          width: "100%",
          minHeight: "300px",
          background: "#0D0D0D",
        }}
      />

      {/* Loading indicator shown while camera is initialising */}
      {!cameraReady && !permissionDenied && (
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
