import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Facebook, Twitter, Linkedin, Mail, Copy } from "lucide-react";
import type { BlogPost } from "@/lib/blog";
import { generateShareUrls } from "@/lib/blog";

interface SocialShareProps {
  post: BlogPost;
  className?: string;
}

export function SocialShare({ post, className = "" }: SocialShareProps) {
  const { toast } = useToast();
  const shareUrls = generateShareUrls(post);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrls.copy);
      toast({
        title: "Link copied!",
        description: "The blog post URL has been copied to your clipboard.",
      });
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Unable to copy link. Please try again.",
        variant: "destructive",
      });
    }
  };

  const shareButtons = [
    {
      name: "Twitter",
      icon: Twitter,
      url: shareUrls.twitter,
      className: "hover:border-midnight-400/70 hover:text-paper",
    },
    {
      name: "Facebook",
      icon: Facebook,
      url: shareUrls.facebook,
      className: "hover:border-midnight-400/70 hover:text-paper",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: shareUrls.linkedin,
      className: "hover:border-midnight-400/70 hover:text-paper",
    },
    {
      name: "Email",
      icon: Mail,
      url: shareUrls.email,
      className: "hover:border-copper-500/70 hover:text-paper",
    },
  ];

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      <span className="text-xs font-semibold uppercase tracking-[0.22em] text-paper-muted mb-2 w-full">
        Share this article:
      </span>
      {shareButtons.map((button) => (
        <Button
          key={button.name}
          variant="outline"
          size="sm"
          className={`border-border bg-transparent text-paper-secondary hover:bg-accent ${button.className}`}
          onClick={() => window.open(button.url, '_blank', 'noopener,noreferrer')}
        >
          <button.icon className="w-4 h-4 mr-2" strokeWidth={1.75} />
          {button.name}
        </Button>
      ))}
      <Button
        variant="outline"
        size="sm"
        className="border-border bg-transparent text-paper-secondary hover:border-copper-500/70 hover:bg-accent hover:text-paper"
        onClick={handleCopyLink}
      >
        <Copy className="w-4 h-4 mr-2" strokeWidth={1.75} />
        Copy Link
      </Button>
    </div>
  );
}
