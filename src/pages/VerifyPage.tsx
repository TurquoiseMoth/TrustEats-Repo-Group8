<<<<<<< HEAD
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ROUTES } from '../constants';

export default function VerifyPage() {
  const navigate = useNavigate();
  const [nafdac, setNafdac] = useState('');
  const [company, setCompany] = useState('');
  const [error, setError] = useState('');

  const handleVerify = () => {
    if (!nafdac.trim()) {
      setError('Please enter a NAFDAC number');
      return;
    }
    setError('');
    navigate(ROUTES.RESULT.replace(':barcode', nafdac));
  };

  return (
    <div style={styles.page}>

      <div style={styles.header}>
        <button style={styles.backBtn} onClick={() => navigate(-1)}>‹</button>
        <h1 style={styles.headerTitle}>Scan & Verify</h1>
      </div>

      <div style={styles.camera}>
        <div style={{ position: 'absolute', top: 20, left: 20, width: 40, height: 40, borderTop: '3px solid #3F7A46', borderLeft: '3px solid #3F7A46' }} />
        <div style={{ position: 'absolute', top: 20, right: 20, width: 40, height: 40, borderTop: '3px solid #3F7A46', borderRight: '3px solid #3F7A46' }} />
        <div style={{ position: 'absolute', bottom: 20, left: 20, width: 40, height: 40, borderBottom: '3px solid #3F7A46', borderLeft: '3px solid #3F7A46' }} />
        <div style={{ position: 'absolute', bottom: 20, right: 20, width: 40, height: 40, borderBottom: '3px solid #3F7A46', borderRight: '3px solid #3F7A46' }} />
        <div style={styles.scanLine} />
      </div>

      <div style={styles.form}>
        <h2 style={styles.formTitle}>Verify with NAFDAC Number</h2>
        <p style={styles.formSubtitle}>Enter the product details below to verify authenticity</p>

        <div style={styles.field}>
          <label style={styles.label}>NAFDAC Number <span style={styles.required}>*</span></label>
          <input
            type="text"
            placeholder="e.g. 2782864"
            value={nafdac}
            onChange={e => { setNafdac(e.target.value); setError(''); }}
            style={{ ...styles.input, ...(error ? styles.inputError : {}) }}
          />
          {error && <span style={styles.errorText}>{error}</span>}
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Company name / Brand <span style={styles.optional}>(optional)</span></label>
          <input
            type="text"
            placeholder="e.g. Gino"
            value={company}
            onChange={e => setCompany(e.target.value)}
            style={styles.input}
          />
        </div>

        <button style={styles.btnPrimary} onClick={handleVerify}>
          Verify Product
        </button>
      </div>

    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    background: '#ffffff',
    fontFamily: "'Inter', sans-serif",
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '16px 20px',
    background: '#ffffff',
    borderBottom: '1px solid #F0F0F0',
  },
  backBtn: {
    background: 'none',
    border: 'none',
    fontSize: '26px',
    color: '#111',
    cursor: 'pointer',
    lineHeight: 1,
    padding: '0',
  },
  headerTitle: {
    fontSize: '17px',
    fontWeight: 700,
    color: '#111',
  },
  camera: {
    width: '100%',
    height: '240px',
    background: '#0D0D0D',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanLine: {
    width: '60%',
    height: '2px',
    background: '#3F7A46',
    opacity: 0.9,
  },
  form: {
    padding: '24px 20px 40px',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  formTitle: {
    fontSize: '18px',
    fontWeight: 700,
    color: '#111',
    marginBottom: '6px',
  },
  formSubtitle: {
    fontSize: '13px',
    color: '#888',
    marginBottom: '24px',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '18px',
  },
  label: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#111',
    marginBottom: '6px',
  },
  required: {
    color: '#E53935',
  },
  optional: {
    color: '#888',
    fontWeight: 400,
    fontSize: '12px',
  },
  input: {
    height: '52px',
    background: '#F9F9F9',
    border: '1px solid #E0E0E0',
    borderRadius: '8px',
    padding: '0 16px',
    fontSize: '15px',
    fontFamily: "'Inter', sans-serif",
    color: '#111',
    outline: 'none',
    width: '100%',
  },
  inputError: {
    border: '1px solid #E53935',
  },
  errorText: {
    fontSize: '12px',
    color: '#E53935',
    marginTop: '5px',
  },
  btnPrimary: {
    width: '100%',
    height: '52px',
    background: '#3F7A46',
    color: '#fff',
    fontSize: '16px',
    fontWeight: 700,
    fontFamily: "'Inter', sans-serif",
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    marginTop: '8px',
  },
};
=======
import { Check, ArrowLeft } from "lucide-react";
import { Link } from "react-router";
import { Button } from "../components/ui";

export default function VerifyPage() {
    return (
        <div className="min-h-screen bg-[#F4F7F9] flex flex-col items-center px-4 py-12 font-sans">
            {/* Top Success Section with Confetti & Circular Check */}
            <div className="relative mt-8 mb-6 flex flex-col items-center">
                {/* Circular Div with Check */}
                <div className="relative flex h-[100px] w-[100px] items-center justify-center rounded-full bg-green-100 shadow-sm border border-green-200">
                    <div className="flex h-[70px] w-[70px] items-center justify-center rounded-full bg-green-500 text-white shadow-md">
                        <Check size={36} strokeWidth={3} />
                    </div>
                    {/* Confetti particles */}
                    <div className="absolute top-[-10px] left-[-20px] h-3 w-3 rotate-45 bg-blue-400"></div>
                    <div className="absolute top-[10px] right-[-30px] h-3 w-3 rounded-full bg-yellow-400"></div>
                    <div className="absolute bottom-[-10px] left-[-10px] h-3 w-3 rounded-full bg-pink-400"></div>
                    <div className="absolute bottom-[20px] right-[-20px] h-3 w-3 rotate-12 bg-purple-400"></div>
                    <div className="absolute top-[-30px] right-[10px] h-2 w-2 rounded-full bg-red-400"></div>
                    <div className="absolute bottom-[-20px] left-[30px] h-2 w-2 rotate-45 bg-orange-400"></div>
                    <div className="absolute top-[40px] left-[-40px] h-2 w-2 rounded-full bg-green-400"></div>
                    <div className="absolute top-[50px] right-[-40px] h-2.5 w-2.5 rotate-[-20deg] bg-cyan-400"></div>
                </div>
                
                {/* Verified Badge */}
                <div className="mt-8 flex items-center gap-1.5 rounded-full border border-green-200 bg-white px-4 py-1.5 text-sm font-semibold text-[#397240] shadow-sm">
                    <Check size={16} strokeWidth={2.5} /> Product is Verified
                </div>
                
                <p className="mt-4 max-w-xs text-center text-[15px] leading-relaxed text-gray-500">
                    This product has undergone through all verification and is duly verified by <span className="font-bold text-gray-700">NAFDAC</span>
                </p>
            </div>

            {/* Product Details Card */}
            <div className="w-full max-w-[380px] rounded-[1.25rem] border-[1.5px] border-[#397240]/40 bg-[#F4F7F9] p-6 shadow-sm mb-10">
                <h3 className="mb-6 text-[17px] font-bold text-gray-900 tracking-wide">Product  Details</h3>
                
                <div className="space-y-4">
                    <div className="flex justify-between border-b border-gray-300 pb-4">
                        <span className="text-[15px] text-gray-600">Product  Name</span>
                        <span className="text-[15px] font-medium text-gray-800 text-right leading-tight">Gino Pepper and<br/>Onion Paste</span>
                    </div>
                    
                    <div className="flex justify-between border-b border-gray-300 pb-4 pt-1">
                        <span className="text-[15px] text-gray-600">NAFDAC Number</span>
                        <span className="text-[15px] font-medium text-gray-800">2782864</span>
                    </div>
                    
                    <div className="flex justify-between border-b border-gray-300 pb-4 pt-1">
                        <span className="text-[15px] text-gray-600">Manufactured Date</span>
                        <span className="text-[15px] font-medium text-gray-800">20/06/2026</span>
                    </div>
                    
                    <div className="flex justify-between border-b border-gray-300 pb-4 pt-1">
                        <span className="text-[15px] text-gray-600">Expiry Date</span>
                        <span className="text-[15px] font-medium text-gray-800">22/06/2027</span>
                    </div>
                    
                    <div className="flex justify-between pt-2">
                        <span className="text-[15px] text-gray-600">Company/Brand</span>
                        <span className="text-[15px] font-medium text-gray-800">Gino</span>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="w-full max-w-[380px] flex gap-3 mb-10">
                <Button className="flex-1 rounded-full bg-[#397240] py-6 text-[15px] font-semibold text-white hover:bg-green-800 transition-colors shadow-sm">
                    Return to Scan
                </Button>
                <Button className="flex-1 rounded-full border-2 border-[#397240] bg-transparent py-6 text-[15px] font-semibold text-[#397240] hover:bg-green-50 transition-colors">
                    Report
                </Button>
            </div>

            {/* Return to Dashboard Link */}
            <Link to="/dashboard" className="flex items-center gap-2 text-[15px] font-semibold text-[#397240] hover:underline underline-offset-4 mt-2">
                <ArrowLeft size={18} strokeWidth={2.5} /> Return to Dashboard
            </Link>
        </div>
    );
}
>>>>>>> b052239b5b3dc9cd345a4e11f7b9d1e078b1506f
