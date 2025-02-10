import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';

const waitlistSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name is too long'),
  email: z.string().email('Please enter a valid email address').max(100, 'Email is too long'),
  status: z.enum(['couch_potato', 'beginner', 'enthusiast', 'endurance_pro'], {
    required_error: "Please select your running level",
  }),
  longestRun: z.enum(['0_2km', '2_5km', '5_10km', '10_plus_km'], {
    required_error: "Please select your longest run",
  }),
});

type WaitlistFormValues = z.infer<typeof waitlistSchema>;

const runnerStatusOptions = [
  { value: 'couch_potato', label: "Couch Potato", description: "Just starting my fitness journey" },
  { value: 'beginner', label: "Beginner", description: "Can run up to 2km" },
  { value: 'enthusiast', label: "Enthusiast", description: "Regular runner" },
  { value: 'endurance_pro', label: "Endurance Pro", description: "Experienced runner" },
];

const longestRunOptions = [
  { value: '0_2km', label: "0–2 km", description: "Getting started" },
  { value: '2_5km', label: "2–5 km", description: "Building endurance" },
  { value: '5_10km', label: "5–10 km", description: "Intermediate" },
  { value: '10_plus_km', label: "10+ km", description: "Advanced" },
];

export default function WaitlistForm() {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<WaitlistFormValues>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: {
      email: '',
      name: '',
      status: 'couch_potato',
      longestRun: '0_2km',
    },
  });

  const onSubmit = async (data: WaitlistFormValues) => {
    try {
      await apiRequest('POST', '/api/waitlist', data);

      toast({
        title: "Success!",
        description: "You've been added to our waitlist. We'll be in touch soon!",
        duration: 5000,
      });

      setIsOpen(false);
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Something went wrong. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button 
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold"
            aria-label="Join waitlist for AI-powered marathon training"
          >
            Join Waitlist
          </Button>
        </motion.div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Join the Waitlist</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Be among the first to experience AI-powered marathon training.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="John Doe" 
                      {...field} 
                      aria-describedby="name-description"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="john@example.com" 
                      type="email" 
                      {...field}
                      aria-describedby="email-description"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Running Level</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger aria-label="Select your running level">
                        <SelectValue placeholder="Select your running level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {runnerStatusOptions.map((option) => (
                        <SelectItem 
                          key={option.value} 
                          value={option.value}
                          className="flex flex-col items-start"
                        >
                          <span className="font-medium">{option.label}</span>
                          <span className="text-sm text-muted-foreground">{option.description}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="longestRun"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Longest Run (Last 6 Months)</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger aria-label="Select your longest run distance">
                        <SelectValue placeholder="Select your longest run" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {longestRunOptions.map((option) => (
                        <SelectItem 
                          key={option.value} 
                          value={option.value}
                          className="flex flex-col items-start"
                        >
                          <span className="font-medium">{option.label}</span>
                          <span className="text-sm text-muted-foreground">{option.description}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Submitting..." : "Join Waitlist"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}