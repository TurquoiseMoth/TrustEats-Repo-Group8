import { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { ChevronLeft, Upload, X } from 'lucide-react';
import { ROUTES } from '../constants';
import { reportsService } from '../services/reports';



const ISSUE_OPTIONS = [
    'Fake Product',
    'Expired Product',
    'Wrong Packaging',
    'Missing Verification Code',
    'Damaged Packaging',
    'Suspicious Label',
    'Other',
];

export default function ReportPage() {
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [code, setCode] = useState('');
    const [reason, setReason] = useState(ISSUE_OPTIONS[0]);
    const [comment, setComment] = useState('');
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState("");


    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (file && (file.type === 'image/jpeg' || file.type === 'image/png') && file.size <= 5 * 1024 * 1024) {
            setUploadedFile(file);
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSubmitError("");
        if (!code || !comment) {
            setSubmitError("Please fill in the required fields.");
            return;
        }
        setSubmitting(true);
        try {
            const form = new FormData();
            form.append('code', code);
            const augmentedComment = `${reason}: ${comment}`;
            form.append('comment', augmentedComment);
            if (uploadedFile) form.append('images', uploadedFile);

            await reportsService.create(form);
            // navigate back to dashboard on success
            navigate(ROUTES.DASHBOARD);
        } catch (err) {
            const e = err as Error | { message?: string } | null;
            // report submit failed — error handled below.
            setSubmitError(e?.message ?? 'Failed to submit report');
        } finally {
            setSubmitting(false);
        }
    }



    return (
        <div style={styles.page}>
            {/* Header */}
            <div style={styles.headerRow}>
                <button style={styles.backBtn} onClick={() => navigate(-1)}>
                    <ChevronLeft size={22} strokeWidth={2.5} />
                </button>
                <h1 style={styles.headerTitle}>Report Counterfeit</h1>
            </div>

            <form onSubmit={handleSubmit} style={styles.form}>
                {/* Verification Code */}
                <div style={styles.fieldGroup}>
                    <label style={styles.label}>
                        Verification Code <span style={{ color: '#ce0000' }}>*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Enter the product's verification code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        style={styles.input}
                    />
                </div>

                {/* Reason */}
                <div style={styles.fieldGroup}>
                    <label style={styles.label}>
                        Reason <span style={{ color: '#ce0000' }}>*</span>
                    </label>
                    <select
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        style={{ ...styles.input, height: '44px' }}
                    >
                        {ISSUE_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>
                </div>

                {/* Comment */}
                <div style={styles.fieldGroup}>
                    <label style={styles.label}>
                        Comment <span style={{ color: '#ce0000' }}>*</span>
                    </label>
                    <div style={{ position: 'relative' }}>
                        <textarea
                            placeholder="Describe the issue in detail..."
                            value={comment}
                            onChange={(e) => {
                                if (e.target.value.length <= 500) setComment(e.target.value);
                            }}
                            style={styles.textarea}
                            rows={5}
                        />
                        <span style={styles.charCount}>{comment.length}/500</span>
                    </div>
                    <p style={{ ...styles.helperText, marginTop: 6 }}>The selected reason will be prefixed to your comment before submission.</p>
                </div>

                {/* Images */}
                <div style={styles.fieldGroup}>
                    <label style={styles.label}>Images</label>
                    <p style={styles.helperText}>Add photo of the product, packaging or any other evidence.</p>

                    {uploadedFile ? (
                        <div style={styles.uploadedPreview}>
                            <img
                                src={URL.createObjectURL(uploadedFile)}
                                alt="Evidence"
                                style={styles.uploadedImage}
                            />
                            <button
                                type="button"
                                style={styles.removeBtn}
                                onClick={() => setUploadedFile(null)}
                            >
                                <X size={16} />
                            </button>
                        </div>
                    ) : (
                        <div
                            style={styles.uploadBox}
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <div style={styles.uploadInner}>
                                <div style={styles.uploadIconCircle}>
                                    <Upload size={20} color="#3c7443" />
                                </div>
                                <p style={styles.uploadText}>Add photo</p>
                                <p style={styles.uploadHint}>JPG, PNG up to 5MB</p>
                            </div>
                        </div>
                    )}
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/jpeg,image/png"
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />
                </div>

                {submitError && <p style={{     color: '#ce0000', fontSize: '14px', margin: 0 }}>{submitError}</p>}
                {/* Submit */}
                <button type="submit" style={{ ...styles.submitBtn, opacity: submitting ? 0.7 : 1, cursor: submitting ? 'not-allowed' : 'pointer' }} disabled={submitting}>
                    {submitting ? 'Submitting...' : 'Submit'}
                </button>
            </form>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    page: {
        minHeight: '100vh',
        background: '#F5F7FA',
        fontFamily: "'Inter', sans-serif",
        display: 'flex',
        flexDirection: 'column',
    },
    headerRow: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: '8px',
        padding: '16px 16px 0',
    },
    backBtn: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: 0,
        display: 'flex',
        alignItems: 'center',
        color: '#292d32',
    },
    headerTitle: {
        fontSize: '20px',
        fontWeight: 700,
        color: '#292d32',
        margin: 0,
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        padding: '20px 16px 40px',
    },
    fieldGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    },
    label: {
        fontSize: '14px',
        fontWeight: 600,
        color: '#292d32',
        margin: 0,
    },
    input: {
        width: '100%',
        padding: '14px 16px',
        background: '#fff',
        border: '1.5px solid #D1D5DB',
        borderRadius: '10px',
        fontSize: '15px',
        fontFamily: "'Inter', sans-serif",
        color: '#292d32',
        outline: 'none',
        boxSizing: 'border-box' as const,
        position: 'relative' as const,
    },
    textarea: {
        width: '100%',
        padding: '14px 16px',
        background: '#fff',
        border: '1.5px solid #D1D5DB',
        borderRadius: '10px',
        fontSize: '15px',
        fontFamily: "'Inter', sans-serif",
        color: '#292d32',
        outline: 'none',
        resize: 'none',
        boxSizing: 'border-box' as const,
        minHeight: '130px',
    },
    charCount: {
        position: 'absolute',
        bottom: '12px',
        right: '14px',
        fontSize: '12px',
        color: '#999',
    },
    helperText: {
        fontSize: '13px',
        color: '#9CA3AF',
        margin: 0,
    },
    uploadBox: {
        border: '1.5px dashed #D1D5DB',
        borderRadius: '12px',
        background: '#fff',
        cursor: 'pointer',
        overflow: 'hidden',
    },
    uploadInner: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '28px 16px',
        gap: '8px',
    },
    uploadIconCircle: {
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        background: '#E8F5E9',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    uploadText: {
        fontSize: '14px',
        fontWeight: 600,
        color: '#3c7443',
        margin: 0,
    },
    uploadHint: {
        fontSize: '12px',
        color: '#999',
        margin: 0,
    },
    uploadedPreview: {
        position: 'relative',
        width: '100%',
        borderRadius: '12px',
        overflow: 'hidden',
        border: '1.5px solid #D1D5DB',
        background: '#fff',
    },
    uploadedImage: {
        width: '100%',
        height: '200px',
        objectFit: 'cover',
        display: 'block',
    },
    removeBtn: {
        position: 'absolute',
        top: '8px',
        right: '8px',
        width: '28px',
        height: '28px',
        borderRadius: '50%',
        background: 'rgba(0,0,0,0.5)',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    submitBtn: {
        width: '100%',
        height: '52px',
        background: '#3c7443',
        color: '#fff',
        fontSize: '16px',
        fontWeight: 700,
        fontFamily: "'Inter', sans-serif",
        border: 'none',
        borderRadius: '10px',
        marginTop: '12px',
    },
};
