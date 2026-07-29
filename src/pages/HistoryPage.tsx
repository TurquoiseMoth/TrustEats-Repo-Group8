import { useState } from "react";
import { ChevronLeft, ChevronRight, CheckCircle2, AlertTriangle, XCircle, X, BadgeCheck } from "lucide-react";
import { useNavigate } from "react-router";
import { MOCK_VERIFICATIONS, PRODUCT_META } from "../utils/mockData";

// Helper: map verification result to display status
function mapResult(result: string): 'Verified' | 'NOT Verified' | 'Fake' {
    if (result === 'Genuine') return 'Verified';
    if (result === 'Counterfeit') return 'Fake';
    return 'NOT Verified';
}

// Helper: format "2026-08-01 23:56" → "Aug 1, 11:56 PM"
function formatScanDate(dateStr: string): string {
    const date = new Date(dateStr.replace(' ', 'T'));
    if (isNaN(date.getTime())) return dateStr;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        + ', ' + date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
}

// Build history items from mock verification records
const historyItems = MOCK_VERIFICATIONS.map((v, idx) => {
    const meta = PRODUCT_META[v.product] ?? { nafdac: 'N/A', mfg: 'N/A', exp: 'N/A', image: '' };
    return {
        id: idx + 1,
        verificationId: v.id,
        name: v.product,
        status: mapResult(v.result),
        date: formatScanDate(v.scanDate),
        image: meta.image,
        NAFDAC: meta.nafdac,
        mfg: meta.mfg,
        exp: meta.exp,
        brand: v.manufacturer,
        state: v.state,
        method: v.method,
        device: v.device,
    };
});

export default function HistoryPage() {
    const navigate = useNavigate();
    const [selectedProduct, setSelectedProduct] = useState<typeof historyItems[0] | null>(null);

    return (
        <div className="min-h-screen bg-[#F4F7F9] flex flex-col font-sans pb-24 relative">
            {/* Header */}
            <div className="flex items-center px-4 py-6">
                <button onClick={() => navigate(-1)} className="mr-4 text-gray-700">
                    <ChevronLeft size={24} />
                </button>
                <h1 className="text-[22px] font-bold text-[#1F2937]">History</h1>
            </div>

            {/* List */}
            <div className="flex-1 px-4 space-y-3 max-w-md mx-auto w-full">
                {historyItems.map((item) => (
                    <div 
                        key={item.id} 
                        className="flex items-center justify-between rounded-xl bg-white p-3.5 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => setSelectedProduct(item)}
                    >
                        <div className="flex items-center gap-4">
                            {/* Product Image */}
                            <div className="h-[72px] w-[60px] rounded-md flex-shrink-0 relative overflow-hidden flex items-center justify-center bg-gray-50 border border-gray-100 p-1">
                                <img src={item.image} alt={item.name} className="h-full w-full object-contain" />
                            </div>
                            
                            <div className="flex flex-col justify-center gap-1.5">
                                <h3 className="text-[16px] font-bold text-[#1F2937] leading-tight">{item.name}</h3>
                                
                                {item.status === "Verified" && (
                                    <div className="flex items-center w-fit gap-1 rounded-full border border-[#bbf7d0] bg-[#f0fdf4] px-2 py-0.5 text-[11px] font-semibold text-[#16a34a]">
                                        <CheckCircle2 size={12} strokeWidth={2.5} /> Verified
                                    </div>
                                )}
                                {item.status === "NOT Verified" && (
                                    <div className="flex items-center w-fit gap-1 rounded-full border border-orange-200 bg-[#fff7ed] px-2 py-0.5 text-[11px] font-semibold text-[#f97316]">
                                        <AlertTriangle size={12} strokeWidth={2.5} /> NOT Verified
                                    </div>
                                )}
                                {item.status === "Fake" && (
                                    <div className="flex items-center w-fit gap-1 rounded-full border border-red-200 bg-[#fef2f2] px-2 py-0.5 text-[11px] font-semibold text-[#dc2626]">
                                        <XCircle size={12} strokeWidth={2.5} /> Fake
                                    </div>
                                )}
                                
                                <span className="text-[13px] font-medium text-gray-500 mt-0.5">{item.date}</span>
                            </div>
                        </div>
                        
                        <div className="text-gray-400">
                            <ChevronRight size={20} strokeWidth={2.5} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal Backdrop */}
            {selectedProduct && (
                <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 sm:items-center">
                    <div 
                        className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl pt-5 pb-8 px-5 animate-in slide-in-from-bottom-full sm:slide-in-from-bottom-0 sm:fade-in duration-200"
                    >
                        {/* Modal Header */}
                        <div className="flex justify-end mb-4">
                            <button onClick={() => setSelectedProduct(null)} className="p-1 rounded-full hover:bg-gray-100 transition-colors">
                                <X size={24} className="text-gray-700" strokeWidth={2} />
                            </button>
                        </div>
                        
                        {/* Top Section */}
                        <div className="rounded-2xl border-[1.5px] border-[#e2e8f0] bg-[#f8fafc] p-5 mb-5 flex gap-4 shadow-sm items-center">
                            <div className="w-[100px] h-[130px] flex-shrink-0 bg-white rounded-xl border border-gray-100 p-2 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                                <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-contain" />
                            </div>
                            
                            <div className="flex flex-col items-center justify-center flex-1">
                                <div className="text-[#397240] mb-3">
                                    <BadgeCheck size={48} fill="#397240" color="white" strokeWidth={1.5} />
                                </div>
                                <div className="flex items-center gap-1.5 rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-semibold text-[#397240] shadow-sm mb-3">
                                    <CheckCircle2 size={14} strokeWidth={2.5} /> Product is {selectedProduct.status}
                                </div>
                                <p className="text-[11px] leading-relaxed text-gray-500 text-center px-1">
                                    This product has undergone through all verification and is duly verified by <span className="font-bold text-gray-700">NAFDAC</span>
                                </p>
                            </div>
                        </div>

                        {/* Bottom Section - Product Details */}
                        <div className="rounded-[1.25rem] border-[1.5px] border-[#397240]/40 bg-[#F4F7F9] p-5 shadow-sm">
                            <h3 className="mb-5 text-[17px] font-bold text-gray-900 tracking-wide">Product Details</h3>
                            
                            <div className="space-y-3.5">
                                <div className="flex justify-between border-b border-gray-300 pb-3.5">
                                    <span className="text-[14px] text-gray-600">Product Name</span>
                                    <span className="text-[14px] font-medium text-gray-800 text-right leading-tight max-w-[150px]">{selectedProduct.name}</span>
                                </div>
                                
                                <div className="flex justify-between border-b border-gray-300 pb-3.5 pt-0.5">
                                    <span className="text-[14px] text-gray-600">NAFDAC Number</span>
                                    <span className="text-[14px] font-medium text-gray-800">{selectedProduct.NAFDAC}</span>
                                </div>
                                
                                <div className="flex justify-between border-b border-gray-300 pb-3.5 pt-0.5">
                                    <span className="text-[14px] text-gray-600">Manufactured Date</span>
                                    <span className="text-[14px] font-medium text-gray-800">{selectedProduct.mfg}</span>
                                </div>
                                
                                <div className="flex justify-between border-b border-gray-300 pb-3.5 pt-0.5">
                                    <span className="text-[14px] text-gray-600">Expiry Date</span>
                                    <span className="text-[14px] font-medium text-gray-800">{selectedProduct.exp}</span>
                                </div>
                                
                                <div className="flex justify-between pt-1">
                                    <span className="text-[14px] text-gray-600">Company/Brand</span>
                                    <span className="text-[14px] font-medium text-gray-800">{selectedProduct.brand}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
