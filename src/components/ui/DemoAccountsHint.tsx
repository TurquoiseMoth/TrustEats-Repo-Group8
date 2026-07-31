import { isMockMode } from "../../services/mockMode";
import { MOCK_ACCOUNTS } from "../../services/mockAuth";

export function DemoAccountsHint() {
  if (!isMockMode()) return null;

  return (
    <div className="mb-5 rounded-xl border border-dashed border-primary/40 bg-primary/5 px-4 py-3">
      <p className="mb-2 text-xs font-bold uppercase tracking-wide text-primary">
        Demo accounts
      </p>
      <ul className="space-y-1.5">
        {MOCK_ACCOUNTS.map((account) => (
          <li key={account.email} className="text-xs leading-relaxed text-gray-600">
            <span className="font-semibold capitalize text-gray-800">
              {account.user.role}:
            </span>{" "}
            <span className="font-medium text-gray-800">{account.email}</span>{" "}
            <span className="text-gray-400">/</span>{" "}
            <span className="font-mono">{account.password}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
