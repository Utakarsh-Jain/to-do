"use client"

import { useState, useEffect } from "react"
import {
  Plus,
  Search,
  Calendar,
  Target,
  BarChart3,
  UserIcon,
  Settings,
  Moon,
  Sun,
  Trash2,
  Edit3,
  Check,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Todo {
  id: number
  title: string
  description: string
  completed: boolean
  priority: "low" | "medium" | "high"
  category: string
  dueDate: string
  createdAt: string
}

interface Goal {
  id: number
  title: string
  description: string
  targetDate: string
  progress: number
  category: string
}

interface UserProfile {
  name: string
  email: string
  avatar: string
  theme: "light" | "dark"
  notifications: boolean
}

const priorityColors = {
  low: "bg-green-100 text-green-800 hover:bg-green-200",
  medium: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
  high: "bg-red-100 text-red-800 hover:bg-red-200",
}

const categoryColors = {
  work: "bg-blue-100 text-blue-800 hover:bg-blue-200",
  personal: "bg-purple-100 text-purple-800 hover:bg-purple-200",
  health: "bg-green-100 text-green-800 hover:bg-green-200",
  learning: "bg-orange-100 text-orange-800 hover:bg-orange-200",
  finance: "bg-emerald-100 text-emerald-800 hover:bg-emerald-200",
}

export default function TodoApp() {
  const [activeTab, setActiveTab] = useState("tasks")
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: 1,
      title: "Complete project proposal",
      description: "Finish the Q4 project proposal for the marketing campaign",
      completed: false,
      priority: "high",
      category: "work",
      dueDate: "2024-01-15",
      createdAt: "2024-01-10",
    },
    {
      id: 2,
      title: "Morning workout",
      description: "30-minute cardio session at the gym",
      completed: true,
      priority: "medium",
      category: "health",
      dueDate: "2024-01-12",
      createdAt: "2024-01-11",
    },
    {
      id: 3,
      title: "Read React documentation",
      description: "Study the new React 18 features and concurrent rendering",
      completed: false,
      priority: "low",
      category: "learning",
      dueDate: "2024-01-20",
      createdAt: "2024-01-09",
    },
  ])

  const [goals, setGoals] = useState<Goal[]>([
    {
      id: 1,
      title: "Learn TypeScript",
      description: "Master TypeScript fundamentals and advanced concepts",
      targetDate: "2024-03-01",
      progress: 65,
      category: "learning",
    },
    {
      id: 2,
      title: "Fitness Goal",
      description: "Lose 10 pounds and build muscle",
      targetDate: "2024-04-01",
      progress: 40,
      category: "health",
    },
    {
      id: 3,
      title: "Save for Vacation",
      description: "Save $3000 for summer vacation",
      targetDate: "2024-06-01",
      progress: 80,
      category: "finance",
    },
  ])

  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: "Utakarsh Jain",
    email: "utakarshjain2@gmail.com",
    avatar: "/placeholder.svg?height=40&width=40",
    theme: "light",
    notifications: true,
  })

  // Apply theme to document
  useEffect(() => {
    if (userProfile.theme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [userProfile.theme])

  const [searchTerm, setSearchTerm] = useState("")
  const [filterPriority, setFilterPriority] = useState<string>("all")
  const [filterCategory, setFilterCategory] = useState<string>("all")
  const [isAddingTodo, setIsAddingTodo] = useState(false)
  const [isAddingGoal, setIsAddingGoal] = useState(false)
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null)
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null)
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  const [newTodo, setNewTodo] = useState({
    title: "",
    description: "",
    priority: "medium" as const,
    category: "work",
    dueDate: "",
  })

  const [newGoal, setNewGoal] = useState({
    title: "",
    description: "",
    targetDate: "",
    category: "personal",
  })

  const filteredTodos = todos.filter((todo) => {
    const matchesSearch =
      todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      todo.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPriority = filterPriority === "all" || todo.priority === filterPriority
    const matchesCategory = filterCategory === "all" || todo.category === filterCategory
    return matchesSearch && matchesPriority && matchesCategory
  })

  const completedTodos = todos.filter((todo) => todo.completed).length
  const totalTodos = todos.length
  const completionRate = totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0

  const toggleTodo = (id: number) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const addTodo = () => {
    if (newTodo.title.trim()) {
      const todo: Todo = {
        id: Date.now(),
        title: newTodo.title,
        description: newTodo.description,
        completed: false,
        priority: newTodo.priority,
        category: newTodo.category,
        dueDate: newTodo.dueDate,
        createdAt: new Date().toISOString().split("T")[0],
      }
      setTodos([...todos, todo])
      setNewTodo({
        title: "",
        description: "",
        priority: "medium",
        category: "work",
        dueDate: "",
      })
      setIsAddingTodo(false)
    }
  }

  const updateTodo = () => {
    if (editingTodo) {
      setTodos(todos.map((todo) => (todo.id === editingTodo.id ? editingTodo : todo)))
      setEditingTodo(null)
    }
  }

  const addGoal = () => {
    if (newGoal.title.trim()) {
      const goal: Goal = {
        id: Date.now(),
        title: newGoal.title,
        description: newGoal.description,
        targetDate: newGoal.targetDate,
        progress: 0,
        category: newGoal.category,
      }
      setGoals([...goals, goal])
      setNewGoal({
        title: "",
        description: "",
        targetDate: "",
        category: "personal",
      })
      setIsAddingGoal(false)
    }
  }

  const updateGoalProgress = (id: number, progress: number) => {
    setGoals(goals.map((goal) => (goal.id === id ? { ...goal, progress } : goal)))
  }

  const deleteGoal = (id: number) => {
    setGoals(goals.filter((goal) => goal.id !== id))
  }

  const updateGoal = () => {
    if (editingGoal) {
      setGoals(goals.map((goal) => (goal.id === editingGoal.id ? editingGoal : goal)))
      setEditingGoal(null)
    }
  }

  const updateUserProfile = (updates: Partial<UserProfile>) => {
    setUserProfile((prev) => ({ ...prev, ...updates }))
  }

  const getAnalyticsData = () => {
    const today = new Date()
    const thisWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
    const thisMonth = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)

    const todosThisWeek = todos.filter((todo) => new Date(todo.createdAt) >= thisWeek).length

    const todosThisMonth = todos.filter((todo) => new Date(todo.createdAt) >= thisMonth).length

    const categoryStats = todos.reduce(
      (acc, todo) => {
        acc[todo.category] = (acc[todo.category] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    const priorityStats = todos.reduce(
      (acc, todo) => {
        acc[todo.priority] = (acc[todo.priority] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    return {
      todosThisWeek,
      todosThisMonth,
      categoryStats,
      priorityStats,
      averageGoalProgress:
        goals.length > 0 ? Math.round(goals.reduce((sum, goal) => sum + goal.progress, 0) / goals.length) : 0,
    }
  }

  const analytics = getAnalyticsData()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Task Manager</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">Stay organized and productive</p>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => updateUserProfile({ theme: userProfile.theme === "light" ? "dark" : "light" })}
              className="dark:border-gray-700"
            >
              {userProfile.theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={userProfile.avatar || "/placeholder.svg"} alt={userProfile.name} />
                    <AvatarFallback>
                      {userProfile.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{userProfile.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{userProfile.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setIsProfileOpen(true)}>
                  <UserIcon className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="tasks" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Tasks
            </TabsTrigger>
            <TabsTrigger value="goals" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Goals
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <UserIcon className="h-4 w-4" />
              Profile
            </TabsTrigger>
          </TabsList>

          {/* Tasks Tab */}
          <TabsContent value="tasks" className="space-y-6">
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterPriority} onValueChange={setFilterPriority}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="work">Work</SelectItem>
                  <SelectItem value="personal">Personal</SelectItem>
                  <SelectItem value="health">Health</SelectItem>
                  <SelectItem value="learning">Learning</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                </SelectContent>
              </Select>
              <Dialog open={isAddingTodo} onOpenChange={setIsAddingTodo}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Task
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Task</DialogTitle>
                    <DialogDescription>Create a new task to stay organized.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={newTodo.title}
                        onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
                        placeholder="Enter task title"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={newTodo.description}
                        onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
                        placeholder="Enter task description"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="priority">Priority</Label>
                        <Select
                          value={newTodo.priority}
                          onValueChange={(value: any) => setNewTodo({ ...newTodo, priority: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="category">Category</Label>
                        <Select
                          value={newTodo.category}
                          onValueChange={(value) => setNewTodo({ ...newTodo, category: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="work">Work</SelectItem>
                            <SelectItem value="personal">Personal</SelectItem>
                            <SelectItem value="health">Health</SelectItem>
                            <SelectItem value="learning">Learning</SelectItem>
                            <SelectItem value="finance">Finance</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="dueDate">Due Date</Label>
                      <Input
                        id="dueDate"
                        type="date"
                        value={newTodo.dueDate}
                        onChange={(e) => setNewTodo({ ...newTodo, dueDate: e.target.value })}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={addTodo}>Add Task</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalTodos}</div>
                  <p className="text-xs text-muted-foreground">{completedTodos} completed</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{completionRate}%</div>
                  <Progress value={completionRate} className="mt-2" />
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Goals</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{goals.length}</div>
                  <p className="text-xs text-muted-foreground">{analytics.averageGoalProgress}% avg progress</p>
                </CardContent>
              </Card>
            </div>

            {/* Tasks List */}
            <div className="space-y-4">
              {filteredTodos.map((todo) => (
                <Card key={todo.id} className={`transition-all hover:shadow-md ${todo.completed ? "opacity-75" : ""}`}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleTodo(todo.id)}
                          className={`mt-1 ${todo.completed ? "text-green-600" : "text-gray-400"}`}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <div className="flex-1">
                          <h3 className={`font-semibold ${todo.completed ? "line-through text-gray-500" : ""}`}>
                            {todo.title}
                          </h3>
                          <p className={`text-sm text-gray-600 mt-1 ${todo.completed ? "line-through" : ""}`}>
                            {todo.description}
                          </p>
                          <div className="flex items-center gap-2 mt-3">
                            <Badge className={priorityColors[todo.priority]}>{todo.priority}</Badge>
                            <Badge className={categoryColors[todo.category as keyof typeof categoryColors]}>
                              {todo.category}
                            </Badge>
                            {todo.dueDate && (
                              <Badge variant="outline">Due: {new Date(todo.dueDate).toLocaleDateString()}</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" onClick={() => setEditingTodo(todo)}>
                          <Edit3 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteTodo(todo.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Goals Tab */}
          <TabsContent value="goals" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Goals</h2>
                <p className="text-gray-600">Track your long-term objectives</p>
              </div>
              <Dialog open={isAddingGoal} onOpenChange={setIsAddingGoal}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Goal
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Goal</DialogTitle>
                    <DialogDescription>Set a new goal to work towards.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="goalTitle">Title</Label>
                      <Input
                        id="goalTitle"
                        value={newGoal.title}
                        onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                        placeholder="Enter goal title"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="goalDescription">Description</Label>
                      <Textarea
                        id="goalDescription"
                        value={newGoal.description}
                        onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                        placeholder="Enter goal description"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="goalCategory">Category</Label>
                        <Select
                          value={newGoal.category}
                          onValueChange={(value) => setNewGoal({ ...newGoal, category: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="work">Work</SelectItem>
                            <SelectItem value="personal">Personal</SelectItem>
                            <SelectItem value="health">Health</SelectItem>
                            <SelectItem value="learning">Learning</SelectItem>
                            <SelectItem value="finance">Finance</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="targetDate">Target Date</Label>
                        <Input
                          id="targetDate"
                          type="date"
                          value={newGoal.targetDate}
                          onChange={(e) => setNewGoal({ ...newGoal, targetDate: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={addGoal}>Add Goal</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-6">
              {goals.map((goal) => (
                <Card key={goal.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{goal.title}</h3>
                        <p className="text-gray-600 mt-1">{goal.description}</p>
                        <div className="flex items-center gap-2 mt-3">
                          <Badge className={categoryColors[goal.category as keyof typeof categoryColors]}>
                            {goal.category}
                          </Badge>
                          <Badge variant="outline">Target: {new Date(goal.targetDate).toLocaleDateString()}</Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" onClick={() => setEditingGoal(goal)}>
                          <Edit3 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteGoal(goal.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Progress</span>
                        <span className="text-sm text-gray-600">{goal.progress}%</span>
                      </div>
                      <Progress value={goal.progress} className="h-2" />
                      <div className="flex gap-2 mt-3">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateGoalProgress(goal.id, Math.max(0, goal.progress - 10))}
                        >
                          -10%
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateGoalProgress(goal.id, Math.min(100, goal.progress + 10))}
                        >
                          +10%
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Analytics</h2>
              <p className="text-gray-600">Insights into your productivity</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Tasks This Week</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analytics.todosThisWeek}</div>
                  <p className="text-xs text-muted-foreground">New tasks created</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Tasks This Month</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analytics.todosThisMonth}</div>
                  <p className="text-xs text-muted-foreground">Total this month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg Goal Progress</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analytics.averageGoalProgress}%</div>
                  <Progress value={analytics.averageGoalProgress} className="mt-2" />
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                  <Check className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{completionRate}%</div>
                  <p className="text-xs text-muted-foreground">Overall completion</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Tasks by Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(analytics.categoryStats).map(([category, count]) => (
                      <div key={category} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge className={categoryColors[category as keyof typeof categoryColors]}>{category}</Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${(count / totalTodos) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">{count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tasks by Priority</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(analytics.priorityStats).map(([priority, count]) => (
                      <div key={priority} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge className={priorityColors[priority as keyof typeof priorityColors]}>{priority}</Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-red-600 h-2 rounded-full"
                              style={{ width: `${(count / totalTodos) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">{count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Profile Settings</h2>
              <p className="text-gray-600">Manage your account and preferences</p>
            </div>

            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your personal details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={userProfile.avatar || "/placeholder.svg"} alt={userProfile.name} />
                      <AvatarFallback className="text-lg">
                        {userProfile.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <Button variant="outline">Change Avatar</Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={userProfile.name}
                        onChange={(e) => updateUserProfile({ name: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={userProfile.email}
                        onChange={(e) => updateUserProfile({ email: e.target.value })}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Preferences</CardTitle>
                  <CardDescription>Customize your experience</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Theme</Label>
                      <p className="text-sm text-gray-600">Choose your preferred theme</p>
                    </div>
                    <Select
                      value={userProfile.theme}
                      onValueChange={(value: "light" | "dark") => updateUserProfile({ theme: value })}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Notifications</Label>
                      <p className="text-sm text-gray-600">Receive email notifications</p>
                    </div>
                    <Switch
                      checked={userProfile.notifications}
                      onCheckedChange={(checked) => updateUserProfile({ notifications: checked })}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Statistics</CardTitle>
                  <CardDescription>Your productivity overview</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{totalTodos}</div>
                      <p className="text-sm text-gray-600">Total Tasks</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{completedTodos}</div>
                      <p className="text-sm text-gray-600">Completed</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">{goals.length}</div>
                      <p className="text-sm text-gray-600">Active Goals</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">{completionRate}%</div>
                      <p className="text-sm text-gray-600">Success Rate</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Edit Todo Dialog */}
        <Dialog open={!!editingTodo} onOpenChange={() => setEditingTodo(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Task</DialogTitle>
              <DialogDescription>Update your task details.</DialogDescription>
            </DialogHeader>
            {editingTodo && (
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="editTitle">Title</Label>
                  <Input
                    id="editTitle"
                    value={editingTodo.title}
                    onChange={(e) => setEditingTodo({ ...editingTodo, title: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="editDescription">Description</Label>
                  <Textarea
                    id="editDescription"
                    value={editingTodo.description}
                    onChange={(e) => setEditingTodo({ ...editingTodo, description: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="editPriority">Priority</Label>
                    <Select
                      value={editingTodo.priority}
                      onValueChange={(value: any) => setEditingTodo({ ...editingTodo, priority: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="editCategory">Category</Label>
                    <Select
                      value={editingTodo.category}
                      onValueChange={(value) => setEditingTodo({ ...editingTodo, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="work">Work</SelectItem>
                        <SelectItem value="personal">Personal</SelectItem>
                        <SelectItem value="health">Health</SelectItem>
                        <SelectItem value="learning">Learning</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="editDueDate">Due Date</Label>
                  <Input
                    id="editDueDate"
                    type="date"
                    value={editingTodo.dueDate}
                    onChange={(e) => setEditingTodo({ ...editingTodo, dueDate: e.target.value })}
                  />
                </div>
              </div>
            )}
            <DialogFooter>
              <Button onClick={updateTodo}>Update Task</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Goal Dialog */}
        <Dialog open={!!editingGoal} onOpenChange={() => setEditingGoal(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Goal</DialogTitle>
              <DialogDescription>Update your goal details.</DialogDescription>
            </DialogHeader>
            {editingGoal && (
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="editGoalTitle">Title</Label>
                  <Input
                    id="editGoalTitle"
                    value={editingGoal.title}
                    onChange={(e) => setEditingGoal({ ...editingGoal, title: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="editGoalDescription">Description</Label>
                  <Textarea
                    id="editGoalDescription"
                    value={editingGoal.description}
                    onChange={(e) => setEditingGoal({ ...editingGoal, description: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="editGoalCategory">Category</Label>
                    <Select
                      value={editingGoal.category}
                      onValueChange={(value) => setEditingGoal({ ...editingGoal, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="work">Work</SelectItem>
                        <SelectItem value="personal">Personal</SelectItem>
                        <SelectItem value="health">Health</SelectItem>
                        <SelectItem value="learning">Learning</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="editTargetDate">Target Date</Label>
                    <Input
                      id="editTargetDate"
                      type="date"
                      value={editingGoal.targetDate}
                      onChange={(e) => setEditingGoal({ ...editingGoal, targetDate: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="editProgress">Progress (%)</Label>
                  <Input
                    id="editProgress"
                    type="number"
                    min="0"
                    max="100"
                    value={editingGoal.progress}
                    onChange={(e) => setEditingGoal({ ...editingGoal, progress: Number.parseInt(e.target.value) || 0 })}
                  />
                </div>
              </div>
            )}
            <DialogFooter>
              <Button onClick={updateGoal}>Update Goal</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
