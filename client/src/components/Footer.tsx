import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="mt-20 border-t border-white/10 bg-slate-900/50 py-10 backdrop-blur-sm">
      <div className="container mx-auto max-w-6xl px-4 text-center">
        <div className="space-y-6">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm">
            <a href="#privacy" className="text-slate-400 transition-colors hover:text-cyan-400">
              Privacy Policy
            </a>
            <a href="#terms" className="text-slate-400 transition-colors hover:text-cyan-400">
              Terms of Service
            </a>
            <a href="#support" className="text-slate-400 transition-colors hover:text-cyan-400">
              Support
            </a>
            <Link to="/" className="text-slate-400 transition-colors hover:text-cyan-400">
              Home
            </Link>
          </div>
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} ClipCut. Professional video trimming made simple.
          </p>
        </div>
      </div>
    </footer>
  );
};