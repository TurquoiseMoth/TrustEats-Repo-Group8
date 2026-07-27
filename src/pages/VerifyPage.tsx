import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ROUTES } from '../constants';

export default function VerifyPage() {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const handleVerify = () => {
    if (!nafdac.trim()) {
      setError('Please enter a NAFDAC number');
      return;
    }
    setError('');
    navigate(ROUTES.RESULT.replace(':code', nafdac));
  };

  const { data: result, isLoading, error } = useQuery<VerificationResult>({
    queryKey: ["verification", code],
    queryFn: () => verificationService.verifyCode(code!),
    enabled: !passedResult && !!code,
    staleTime: 5 * 60 * 1000,
  });

  const verification = passedResult ?? result;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F4F7F9] flex flex-col items-center justify-center px-4 font-sans">
        <Spinner size="lg" />
        <p className="mt-4 text-gray-500 text-sm">Loading product details...</p>
      </div>
    );
  }

  if (error || !verification) {
    return (
      <div className="min-h-screen bg-[#F4F7F9] flex flex-col items-center justify-center px-4 font-sans">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-100 border border-red-200">
          <span className="text-red-500 text-3xl font-bold">!</span>
        </div>
        <p className="mt-6 text-lg font-semibold text-gray-800">Could not load product</p>
        <p className="mt-2 text-sm text-gray-500 text-center max-w-xs">
          The product could not be verified. Please check the code and try again.
        </p>
        <button
          onClick={() => navigate(ROUTES.SCAN)}
          className="mt-6 px-6 py-3 bg-[#397240] text-white rounded-full text-sm font-semibold hover:bg-green-800 transition-colors"
        >
          Return to Scan
        </button>
      </div>
    );
  }

  if (verification.status !== "GENUINE") {
    navigate(ROUTES.RESULT.replace(":code", code ?? ""), { state: { result: verification }, replace: true });
    return null;
  }

  const product = verification.product;

        <div style={styles.field}>
          <label style={styles.label}>
            NAFDAC Number <span style={styles.required}>*</span>
          </label>
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
          <label style={styles.label}>
            Company name / Brand <span style={styles.optional}>(optional)</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Gino"
            value={company}
            onChange={e => setCompany(e.target.value)}
            style={styles.input}
          />
        </div>

        <p className="mt-4 max-w-xs text-center text-[15px] leading-relaxed text-gray-500">
          This product has undergone all verification and is duly verified by{" "}
          <span className="font-bold text-gray-700">NAFDAC</span>
        </p>
      </div>

      {/* Product Details Card */}
      <div className="w-full max-w-95 rounded-[1.25rem] border-[1.5px] border-[#397240]/40 bg-[#F4F7F9] p-6 shadow-sm mb-10">
        <h3 className="mb-6 text-[17px] font-bold text-gray-900 tracking-wide">Product Details</h3>

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
