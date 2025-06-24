
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, X, Send, Star, Bug, Lightbulb, Heart } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { analytics } from "@/utils/analytics";

type FeedbackType = 'bug' | 'feature' | 'general' | 'rating';

export const FeedbackWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [feedbackType, setFeedbackType] = useState<FeedbackType>('general');
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (feedbackType === 'rating' && rating === 0) {
      toast({
        title: "Please select a rating",
        description: "Your rating helps us improve the application.",
        variant: "destructive",
      });
      return;
    }

    if (feedbackType !== 'rating' && message.trim().length < 10) {
      toast({
        title: "Please provide more details",
        description: "Your feedback should be at least 10 characters long.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Track feedback submission
      analytics.track({
        event: 'feedback_submitted',
        category: 'engagement',
        action: feedbackType,
        value: rating,
        metadata: {
          messageLength: message.length,
          userAgent: navigator.userAgent,
          timestamp: new Date().toISOString()
        }
      });

      // In production, send to feedback service
      const feedbackData = {
        type: feedbackType,
        message: message,
        rating: rating,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href,
        sessionId: analytics.getSessionInfo().sessionId
      };

      console.log('[Feedback Submitted]', feedbackData);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast({
        title: "Thank you for your feedback! 🎉",
        description: "We appreciate your input and will review it soon.",
      });

      // Reset form
      setMessage('');
      setRating(0);
      setFeedbackType('general');
      setIsOpen(false);

    } catch (error) {
      console.error('Feedback submission error:', error);
      toast({
        title: "Failed to submit feedback",
        description: "Please try again or contact support directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-40">
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-full w-14 h-14 shadow-lg"
          aria-label="Open feedback widget"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 w-80">
      <Card className="bg-gray-900 border-gray-700 shadow-xl">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-white">Share Your Feedback</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button
              variant={feedbackType === 'bug' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFeedbackType('bug')}
              className="text-xs"
            >
              <Bug className="h-3 w-3 mr-1" />
              Bug Report
            </Button>
            <Button
              variant={feedbackType === 'feature' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFeedbackType('feature')}
              className="text-xs"
            >
              <Lightbulb className="h-3 w-3 mr-1" />
              Feature Request
            </Button>
            <Button
              variant={feedbackType === 'rating' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFeedbackType('rating')}
              className="text-xs"
            >
              <Star className="h-3 w-3 mr-1" />
              Rate Us
            </Button>
            <Button
              variant={feedbackType === 'general' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFeedbackType('general')}
              className="text-xs"
            >
              <Heart className="h-3 w-3 mr-1" />
              General
            </Button>
          </div>

          {feedbackType === 'rating' ? (
            <div className="space-y-3">
              <p className="text-sm text-gray-300">How would you rate your experience?</p>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className={`transition-colors ${
                      star <= rating ? 'text-yellow-400' : 'text-gray-600'
                    }`}
                  >
                    <Star className="h-6 w-6 fill-current" />
                  </button>
                ))}
              </div>
              {rating > 0 && (
                <Textarea
                  placeholder="Tell us more about your experience (optional)"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                  rows={3}
                />
              )}
            </div>
          ) : (
            <Textarea
              placeholder={`Tell us about your ${feedbackType === 'bug' ? 'bug or issue' : feedbackType === 'feature' ? 'feature idea' : 'feedback'}...`}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
              rows={4}
            />
          )}

          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Sending...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Send Feedback
              </>
            )}
          </Button>

          <p className="text-xs text-gray-500 text-center">
            Your feedback helps us improve ClipCut for everyone
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
