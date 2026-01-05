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
      className: "hover:bg-blue-500/10 hover:text-blue-200",
    },
    {
      name: "Facebook",
      icon: Facebook,
      url: shareUrls.facebook,
      className: "hover:bg-blue-500/10 hover:text-blue-200",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: shareUrls.linkedin,
      className: "hover:bg-blue-500/10 hover:text-blue-200",
    },
    {
      name: "Email",
      icon: Mail,
      url: shareUrls.email,
      className: "hover:bg-neutral-800 hover:text-neutral-50",
    },
  ];

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      <span className="text-sm font-medium text-muted-foreground mb-2 w-full">
        Share this article:
      </span>
      {shareButtons.map((button) => (
        <Button
          key={button.name}
          variant="outline"
          size="sm"
          className={`border-neutral-800 bg-neutral-950/40 text-neutral-200 hover:bg-neutral-900 ${button.className}`}
          onClick={() => window.open(button.url, '_blank', 'noopener,noreferrer')}
        >
          <button.icon className="w-4 h-4 mr-2" />
          {button.name}
        </Button>
      ))}
      <Button
        variant="outline"
        size="sm"
        className="border-neutral-800 bg-neutral-950/40 text-neutral-200 hover:bg-green-500/10 hover:text-green-300"
        onClick={handleCopyLink}
      >
        <Copy className="w-4 h-4 mr-2" />
        Copy Link
      </Button>
    </div>
  );
}
