import { Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-8 text-center text-xs text-muted-foreground">
      Crafted with ❤️ by NashTech Green Market Team
      <span className="mx-2">•</span>
      <a 
        href="https://github.com/vnt87/team-marketplace-hub" 
        target="_blank" 
        rel="noopener noreferrer"
        className="hover:text-foreground transition-colors flex items-center justify-center gap-1"
      >
        <Github className="h-4 w-4" />
        View on Github
      </a>
    </footer>
  );
}
