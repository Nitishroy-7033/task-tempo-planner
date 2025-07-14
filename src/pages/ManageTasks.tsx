import { useState } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { 
  CheckCircle2, 
  Clock, 
  Plus, 
  Filter,
  Calendar as CalendarIcon,
  List,
  AlertCircle,
  PlayCircle
} from "lucide-react";
import { AddTaskDialog } from "@/components/AddTaskDialog";

// Mock data for demonstration
const mockTasks = [
  {
    id: 1,
    title: "Mathematics Study Session",
    description: "Algebra and Calculus Review",
    status: "active",
    startTime: "09:00",
    endTime: "11:00",
    date: new Date(),
    color: "hsl(221, 83%, 53%)",
    icon: "📚",
    progress: 45
  },
  {
    id: 2,
    title: "Physics Assignment",
    description: "Complete chapter 5 problems",
    status: "upcoming",
    startTime: "14:00",
    endTime: "16:00",
    date: new Date(),
    color: "hsl(142, 71%, 45%)",
    icon: "⚡",
    progress: 0
  },
  {
    id: 3,
    title: "History Essay",
    description: "World War II research paper",
    status: "completed",
    startTime: "10:00",
    endTime: "12:00",
    date: new Date(Date.now() - 86400000), // Yesterday
    color: "hsl(262, 83%, 58%)",
    icon: "📝",
    progress: 100
  },
  {
    id: 4,
    title: "Chemistry Lab Report",
    description: "Organic compounds analysis",
    status: "pending",
    startTime: "16:00",
    endTime: "18:00",
    date: new Date(Date.now() + 86400000), // Tomorrow
    color: "hsl(24, 70%, 50%)",
    icon: "🧪",
    progress: 25
  }
];

export const ManageTasks = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [activeView, setActiveView] = useState("list");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-secondary text-secondary-foreground";
      case "active": return "bg-primary text-primary-foreground";
      case "upcoming": return "bg-accent text-accent-foreground";
      case "pending": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle2 className="w-4 h-4" />;
      case "active": return <PlayCircle className="w-4 h-4" />;
      case "upcoming": return <Clock className="w-4 h-4" />;
      case "pending": return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const TaskCard = ({ task }: { task: any }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-xl"
              style={{ backgroundColor: task.color }}
            >
              {task.icon}
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{task.title}</h3>
              <p className="text-sm text-muted-foreground">{task.description}</p>
            </div>
          </div>
          <Badge className={getStatusColor(task.status)}>
            {getStatusIcon(task.status)}
            <span className="ml-1 capitalize">{task.status}</span>
          </Badge>
        </div>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{task.startTime} - {task.endTime}</span>
          <span>{task.progress}% Complete</span>
        </div>
        
        <div className="mt-2 w-full bg-muted rounded-full h-2">
          <div 
            className="h-2 rounded-full transition-all duration-300"
            style={{ 
              width: `${task.progress}%`,
              backgroundColor: task.color 
            }}
          />
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Manage Tasks</h1>
            <p className="text-muted-foreground">Organize and track your study sessions</p>
          </div>
          <Button onClick={() => setIsAddTaskOpen(true)} className="bg-primary">
            <Plus className="w-4 h-4 mr-2" />
            Add Task
          </Button>
        </div>

        <Tabs value={activeView} onValueChange={setActiveView} className="space-y-6">
          <div className="flex items-center justify-between">
            <TabsList className="grid w-fit grid-cols-2">
              <TabsTrigger value="list" className="flex items-center">
                <List className="w-4 h-4 mr-2" />
                List View
              </TabsTrigger>
              <TabsTrigger value="calendar" className="flex items-center">
                <CalendarIcon className="w-4 h-4 mr-2" />
                Calendar View
              </TabsTrigger>
            </TabsList>
            
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>

          <TabsContent value="list" className="space-y-6">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-primary">
                    <PlayCircle className="w-5 h-5 mr-2" />
                    Active Tasks
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockTasks.filter(task => task.status === 'active').map(task => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-accent-foreground">
                    <Clock className="w-5 h-5 mr-2" />
                    Upcoming Tasks
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockTasks.filter(task => task.status === 'upcoming').map(task => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-secondary-foreground">
                    <CheckCircle2 className="w-5 h-5 mr-2" />
                    Completed Tasks
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockTasks.filter(task => task.status === 'completed').map(task => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-muted-foreground">
                    <AlertCircle className="w-5 h-5 mr-2" />
                    Pending Tasks
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockTasks.filter(task => task.status === 'pending').map(task => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="calendar" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle>Calendar</CardTitle>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border-0"
                  />
                </CardContent>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>
                    Tasks for {selectedDate?.toLocaleDateString()}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockTasks
                    .filter(task => {
                      if (!selectedDate) return false;
                      return task.date.toDateString() === selectedDate.toDateString();
                    })
                    .map(task => (
                      <TaskCard key={task.id} task={task} />
                    ))}
                  {mockTasks.filter(task => {
                    if (!selectedDate) return false;
                    return task.date.toDateString() === selectedDate.toDateString();
                  }).length === 0 && (
                    <div className="text-center text-muted-foreground py-8">
                      <CalendarIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No tasks scheduled for this date</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <AddTaskDialog 
        open={isAddTaskOpen} 
        onOpenChange={setIsAddTaskOpen}
      />
    </div>
  );
};

export default ManageTasks;