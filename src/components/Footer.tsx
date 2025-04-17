import { Facebook, Github, Instagram, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-slate-900 text-slate-50">
      <div className="container px-4 md:px-6 py-16">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-1 sm:col-span-2">
            <div className="flex items-center text-xl font-bold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-6 w-6"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                <line x1="3" x2="21" y1="9" y2="9" />
                <path d="m9 16 2 2 4-4" />
              </svg>
              TextPeek
            </div>
            <p className="mt-3 text-slate-400 md:w-4/5">
              TextPeek brings text recognition technology to everyone, helping
              you digitize text from any source with ease and accuracy.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-primary">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-slate-400 hover:text-primary">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-slate-400 hover:text-primary">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-slate-400 hover:text-primary">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="#" className="text-slate-400 hover:text-primary">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
            </div>
          </div>
          <div className="col-span-1">
            <h3 className="text-lg font-medium">Product</h3>
            <ul className="mt-4 space-y-2 text-slate-400">
              <li>
                <a href="#features" className="hover:text-primary">
                  Features
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-primary">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  Integrations
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  API
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  Documentation
                </a>
              </li>
            </ul>
          </div>
          <div className="col-span-1">
            <h3 className="text-lg font-medium">Company</h3>
            <ul className="mt-4 space-y-2 text-slate-400">
              <li>
                <a href="#" className="hover:text-primary">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  Press
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div className="col-span-1">
            <h3 className="text-lg font-medium">Legal</h3>
            <ul className="mt-4 space-y-2 text-slate-400">
              <li>
                <a href="#" className="hover:text-primary">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  Cookies
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  Licenses
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  Settings
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-slate-800 pt-8">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <p className="text-center text-sm text-slate-400">
              © {currentYear} TextPeek. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-sm text-slate-400">
              <a href="#" className="hover:text-primary">
                Terms
              </a>
              <div className="h-1 w-1 rounded-full bg-slate-700"></div>
              <a href="#" className="hover:text-primary">
                Privacy
              </a>
              <div className="h-1 w-1 rounded-full bg-slate-700"></div>
              <a href="#" className="hover:text-primary">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
