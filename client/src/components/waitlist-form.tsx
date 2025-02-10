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
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  status: z.enum(['couch_potato', 'noob_runner', 'amateur_runner', 'experienced_runner'], {
    required_error: "Please select your running status",
  }),
  longestRun: z.enum(['0-2km', '2-5km', '5-10km', '10+km'], {
    required_error: "Please select your longest run",
  }),
});

type WaitlistFormValues = z.infer<typeof waitlistSchema>;

const runnerStatusOptions = [
  { value: 'couch_potato', label: 'Couch Potato' },
  { value: 'noob_runner', label: 'Noob Runner' },
  { value: 'amateur_runner', label: 'Amateur Runner' },
  { value: 'experienced_runner', label: 'Can run for >1 hour' },
];

const longestRunOptions = [
  { value: '0-2km', label: '0-2km' },
  { value: '2-5km', label: '2-5km' },
  { value: '5-10km', label: '5-10km' },
  { value: '10+km', label: '10+km' },
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
      longestRun: '0-2km',
    },
  });

  const onSubmit = async (data: WaitlistFormValues) => {
    try {
      await apiRequest('POST', '/api/waitlist', data);

      toast({
        title: "Success!",
        description: "You've been added to our waitlist. We'll be in touch soon!",
      });

      setIsOpen(false);
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Something went wrong. Please try again.",
        variant: "destructive",
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
          <Button className="bg-orange-500 hover:bg-orange-600 text-white">
            Join Waitlist
          </Button>
        </motion.div>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Join the Waitlist</DialogTitle>
          <DialogDescription>
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
                    <Input placeholder="John Doe" {...field} />
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
                    <Input placeholder="john@example.com" type="email" {...field} />
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
                  <FormLabel>Your Running Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your running status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {runnerStatusOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
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
                  <FormLabel>Longest Run in Last 6 Months</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your longest run" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {longestRunOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
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
              className="w-full bg-orange-500 hover:bg-orange-600"
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