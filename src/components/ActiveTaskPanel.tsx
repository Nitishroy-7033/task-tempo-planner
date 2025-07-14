import { useState, useEffect } from "react";
import { Play, Pause, Square, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export const ActiveTaskPanel = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(7200); // 2 hours in seconds
  const [isCompleted, setIsCompleted] = useState(false);
  
  const totalTime = 7200; // 2 hours
  const progress = ((totalTime - timeRemaining) / totalTime) * 100;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            setIsCompleted(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeRemaining]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleStop = () => {
    setIsRunning(false);
    setTimeRemaining(totalTime);
  };
  const handleComplete = () => {
    setIsCompleted(true);
    setIsRunning(false);
  };

  if (isCompleted) {
    return (
      <Card className="bg-gradient-to-br from-secondary to-secondary-light border-0 shadow-lg animate-celebration">
        <CardContent className="p-8 text-center">
          <div className="mb-6">
            <CheckCircle2 className="w-24 h-24 text-secondary-foreground mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-secondary-foreground mb-2">
              🎉 Task Completed!
            </h2>
            <p className="text-secondary-foreground/80 text-lg">
              Great job! You've successfully completed your study session.
            </p>
          </div>
          <Button 
            onClick={() => {
              setIsCompleted(false);
              setTimeRemaining(totalTime);
            }}
            className="bg-secondary-foreground text-secondary hover:bg-secondary-foreground/90"
          >
            Start New Task
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-card to-muted border-0 shadow-lg h-full">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-2xl font-bold text-primary">Active Task</CardTitle>
      </CardHeader>
      
      <CardContent className="p-6 flex flex-col items-center justify-center h-full space-y-8">
        <div className="text-center space-y-4">
          <h3 className="text-xl font-semibold text-foreground">
            Mathematics Study Session
          </h3>
          <p className="text-muted-foreground">
            Algebra and Calculus Review
          </p>
        </div>

        <div className="w-full max-w-sm space-y-4">
          <div className="text-center">
            <div className="text-6xl font-mono font-bold text-primary mb-2">
              {formatTime(timeRemaining)}
            </div>
            <p className="text-sm text-muted-foreground">
              Total: {formatTime(totalTime)}
            </p>
          </div>

          <Progress value={progress} className="w-full h-3" />
        </div>

        <div className="flex space-x-4">
          {!isRunning ? (
            <Button
              onClick={handleStart}
              size="lg"
              className="bg-primary hover:bg-primary-dark text-primary-foreground px-8"
            >
              <Play className="w-5 h-5 mr-2" />
              Start
            </Button>
          ) : (
            <Button
              onClick={handlePause}
              size="lg"
              variant="secondary"
              className="px-8"
            >
              <Pause className="w-5 h-5 mr-2" />
              Pause
            </Button>
          )}
          
          <Button
            onClick={handleStop}
            size="lg"
            variant="outline"
            className="px-8"
          >
            <Square className="w-5 h-5 mr-2" />
            Stop
          </Button>
          
          <Button
            onClick={handleComplete}
            size="lg"
            className="bg-secondary hover:bg-secondary-light text-secondary-foreground px-8"
          >
            <CheckCircle2 className="w-5 h-5 mr-2" />
            Complete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};