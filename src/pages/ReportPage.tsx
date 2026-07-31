import { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { ChevronLeft, ChevronDown, Upload, X } from 'lucide-react';
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

    const [productName, setProductName] = useState('');
    const [companyBrand, setCompanyBrand] = useState('');
    const [issues, setIssues] = useState('');
    const [details, setDetails] = useState('');
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (file && (file.type === 'image/jpeg' || file.type === 'image/png') && file.size <= 5 * 1024 * 1024) {
            setUploadedFile(file);
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        // create report via API
        if (!productName || !issues || !details) return;
        const form = new FormData();
        form.append('code', productName);
        form.append('comment', details);
        if (uploadedFile) form.append('images', uploadedFile);
        try {
            // Use FormData so file attachments are supported
            const baseForm = new FormData();
            baseForm.append('code', productName);
            baseForm.append('comment', details);
            baseForm.append('reason', issues);
            if (uploadedFile) baseForm.append('images', uploadedFile);
            await reportsService.create(baseForm);
            // show a simple confirmation then navigate back
            navigate(ROUTES.DASHBOARD);
        } catch (err) {
            // silent fail for now - could show UI
            console.error('report submit failed', err);
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
                {/* Product Name */}
                <div style={styles.fieldGroup}>
                    <label style={styles.label}>Product name</label>
                    <input
                        type="text"
                        placeholder="Input details"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        style={styles.input}
                    />
                </div>

                {/* Company / Brand */}
                <div style={styles.fieldGroup}>
                    <label style={styles.label}>Company/Brand</label>
                    <input
                        type="text"
                        placeholder="Input details"
                        value={companyBrand}
                        onChange={(e) => setCompanyBrand(e.target.value)}
                        style={styles.input}
                    />
                </div>

                {/* Issues Dropdown */}
                <div style={styles.fieldGroup}>
                    <label style={styles.label}>Issues</label>
                    <div style={{ position: 'relative' }}>
                        <button
                            type="button"
                            style={{
                                ...styles.input,
                                textAlign: 'left',
                                cursor: 'pointer',
                                color: issues ? '#292d32' : '#999',
                            }}
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        >
                            {issues || 'Input details'}
                            <ChevronDown
                                size={18}
                                style={{
                                    position: 'absolute',
                                    right: 14,
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    color: '#999',
                                    pointerEvents: 'none',
                                }}
                            />
                        </button>
                        {isDropdownOpen && (
                            <div style={styles.dropdown}>
                                {ISSUE_OPTIONS.map((opt) => (
                                    <button
                                        key={opt}
                                        type="button"
                                        style={{
                                            ...styles.dropdownItem,
                                            background: issues === opt ? '#F0F7F1' : 'transparent',
                                            color: issues === opt ? '#3c7443' : '#333',
                                        }}
                                        onClick={() => {
                                            setIssues(opt);
                                            setIsDropdownOpen(false);
                                        }}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Provide More Details */}
                <div style={styles.fieldGroup}>
                    <label style={styles.label}>
                        Provide more details <span style={{ color: '#D32F2F' }}>*</span>
                    </label>
                    <div style={{ position: 'relative' }}>
                        <textarea
                            placeholder="Describe the issue in detail..."
                            value={details}
                            onChange={(e) => {
                                if (e.target.value.length <= 500) setDetails(e.target.value);
                            }}
                            style={styles.textarea}
                            rows={5}
                        />
                        <span style={styles.charCount}>{details.length}/500</span>
                    </div>
                </div>

                {/* Upload Evidence */}
                <div style={styles.fieldGroup}>
                    <label style={styles.label}>Upload Evidence</label>
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

                {/* Submit */}
                <button type="submit" style={styles.submitBtn}>
                    Submit
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
    headerLeft: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
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
    dropdown: {
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        marginTop: '4px',
        background: '#fff',
        border: '1.5px solid #D1D5DB',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        zIndex: 20,
        overflow: 'hidden',
    },
    dropdownItem: {
        display: 'block',
        width: '100%',
        padding: '12px 16px',
        background: 'transparent',
        border: 'none',
        fontSize: '14px',
        fontFamily: "'Inter', sans-serif",
        textAlign: 'left',
        cursor: 'pointer',
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
        color: '#888',
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
        cursor: 'pointer',
        marginTop: '12px',
    },
};
