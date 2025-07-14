import { useState } from "react";
import { Header } from "@/components/Header";
import { ActiveTaskPanel } from "@/components/ActiveTaskPanel";
import { UpcomingTasksPanel } from "@/components/UpcomingTasksPanel";
import { AddTaskDialog } from "@/components/AddTaskDialog";

const Index = () => {
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-140px)]">
          {/* Left Panel - Active Task */}
          <ActiveTaskPanel />
          
          {/* Right Panel - Upcoming Tasks */}
          <UpcomingTasksPanel onAddTask={() => setIsAddTaskOpen(true)} />
        </div>
      </main>

      <AddTaskDialog 
        open={isAddTaskOpen} 
        onOpenChange={setIsAddTaskOpen}
      />
    </div>
  );
};

export default Index;
