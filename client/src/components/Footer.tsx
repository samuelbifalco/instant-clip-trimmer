import { Card } from "@/components/ui/card";

export const Footer = () => {
  return (
    <footer className="mt-16 py-8 border-t border-gray-800/50 bg-gradient-to-r from-gray-900/50 to-black/50 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <div className="space-y-4">
          {/* Links */}
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <a 
              href="/privacy" 
              className="text-gray-400 hover:text-cyan-400 transition-colors duration-200"
            >
              Privacy Policy
            </a>
            <a 
              href="/terms" 
              className="text-gray-400 hover:text-cyan-400 transition-colors duration-200"
            >
              Terms of Service
            </a>
            <a 
              href="/support" 
              className="text-gray-400 hover:text-cyan-400 transition-colors duration-200"
            >
              Support
            </a>
            <a 
              href="/contact" 
              className="text-gray-400 hover:text-cyan-400 transition-colors duration-200"
            >
              Contact
            </a>
          </div>
          
          {/* Copyright */}
          <div className="text-gray-500 text-sm">
            © 2025 ClipCut - a{" "}
            <a 
              href="https://redcelventures.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 transition-colors duration-200 font-semibold"
            >
              Redcel
            </a>{" "}
            brand. All Rights Reserved.
          </div>
          
          {/* Tagline */}
          <div className="text-xs text-gray-600">
            Professional video trimming made simple
          </div>
        </div>
      </div>
    </footer>
  );
};