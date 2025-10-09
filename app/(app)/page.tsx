"use server";

import { Bell, Calendar, ChevronDown, Download, Filter, Mail, Plus, Star, AlertCircle, Info, HomeIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Slider } from "@/components/ui/slider";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import BasicModal from "@/components/shared/modal/basic-modal";
import ButtonWithToast from "@/components/shared/button-with-toast";

const tableData = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "Active",
  },
];

export default async function ShadcnTemplate() {
  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background">
        {/* PageHeader */}
        <section className="container mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HomeIcon className="text-primary w-8 h-8" />
            <h1 className="text-2xl font-semibold">Início</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm">
              <Plus />
              <span>Add New</span>
            </Button>
            <Button variant="outline" size="sm">
              <Download />
              <span>Second Action</span>
            </Button>
          </div>
        </section>

        {/* Main Content */}
        <main className="container mx-auto px-8 py-8">
          {/* Alerts Section */}
          <div className="mb-8 space-y-4">
            <h2 className="text-xl font-semibold">Alerts & Notifications</h2>
            <Alert>
              <Info />
              <AlertTitle>Information</AlertTitle>
              <AlertDescription>This is an informational alert with an icon.</AlertDescription>
            </Alert>
            <Alert variant="destructive">
              <AlertCircle />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>This is a destructive alert variant.</AlertDescription>
            </Alert>
          </div>

          {/* Cards Grid */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Cards & Content</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Statistics
                    <Badge variant="secondary">New</Badge>
                  </CardTitle>
                  <CardDescription>Overview of key metrics and performance indicators.</CardDescription>
                </CardHeader>
                <Separator />
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Progress</span>
                      <span className="font-medium">45%</span>
                    </div>
                    <Progress value={45} className="w-full" />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <div className="flex space-x-2 justify-end">
                    <Button size="sm">Increase</Button>
                    <Button size="sm" variant="outline">
                      Decrease
                    </Button>
                  </div>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>User Profile</CardTitle>
                  <CardDescription>Manage your account settings and preferences.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">John Doe</p>
                      <p className="text-xs text-muted-foreground">john@example.com</p>
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="notifications">Email Notifications</Label>
                      <Switch id="notifications" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="marketing">Marketing Emails</Label>
                      <Switch id="marketing" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button className="flex-1">Save Changes</Button>
                  <Button variant="outline" size="icon">
                    <Plus />
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Frequently used actions and shortcuts.</CardDescription>
                </CardHeader>
                <CardContent></CardContent>
                <CardFooter className="flex">
                  <div className="grid grid-cols-2 gap-2 w-full">
                    <BasicModal title="Crie um novo item" description="Preencha o formulário abaixo para criar um novo item.">
                      <Button variant="outline" size="sm">
                        <Plus className="mr-2 h-4 w-4" />
                        Criar
                      </Button>
                    </BasicModal>

                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Export
                    </Button>

                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Filter className="mr-2 h-4 w-4" />
                          Filter
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80">
                        <div className="grid gap-4">
                          <div className="space-y-2">
                            <h4 className="font-medium leading-none">Filter Options</h4>
                            <p className="text-sm text-muted-foreground">Set the filter criteria for the data.</p>
                          </div>
                          <div className="grid gap-2">
                            <div className="grid grid-cols-3 items-center gap-4">
                              <Label htmlFor="status">Status</Label>
                              <Select>
                                <SelectTrigger className="col-span-2">
                                  <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="active">Active</SelectItem>
                                  <SelectItem value="inactive">Inactive</SelectItem>
                                  <SelectItem value="pending">Pending</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                              <Label htmlFor="role">Role</Label>
                              <Select>
                                <SelectTrigger className="col-span-2">
                                  <SelectValue placeholder="Select role" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="admin">Admin</SelectItem>
                                  <SelectItem value="user">User</SelectItem>
                                  <SelectItem value="moderator">Moderator</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>

                    <ButtonWithToast
                      kind="info"
                      code="sample-message"
                      override="This is a sample toast message."
                      variant="outline"
                      size="sm"
                    >
                      <Bell className="mr-2 h-4 w-4" />
                      Toast
                    </ButtonWithToast>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Tabs & Navigation</h2>
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Overview Dashboard</CardTitle>
                    <CardDescription>A comprehensive view of your system status and metrics.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold">1,234</div>
                        <div className="text-sm text-muted-foreground">Total Users</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">567</div>
                        <div className="text-sm text-muted-foreground">Active Sessions</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">89%</div>
                        <div className="text-sm text-muted-foreground">Uptime</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="analytics">
                <Card>
                  <CardHeader>
                    <CardTitle>Analytics</CardTitle>
                    <CardDescription>Detailed analytics and performance metrics.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Analytics content would go here.</p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="reports">
                <Card>
                  <CardHeader>
                    <CardTitle>Reports</CardTitle>
                    <CardDescription>Generate and view various reports.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Reports content would go here.</p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="notifications">
                <Card>
                  <CardHeader>
                    <CardTitle>Notifications</CardTitle>
                    <CardDescription>Manage your notification preferences.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Notification settings would go here.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Table Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Data Tables</h2>
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage users and their permissions in your system.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableCaption>A list of users in your system.</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tableData.map((user: { id: number; name: string; email: string; role: string; status: string }) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback>
                                {user.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span>{user.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge variant={user.role === "Admin" ? "default" : "secondary"}>{user.role}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={user.status === "Active" ? "default" : "destructive"}>{user.status}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <ChevronDown className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>View details</DropdownMenuItem>
                              <DropdownMenuItem>Edit user</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">Delete user</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Forms Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Forms & Inputs</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Form</CardTitle>
                  <CardDescription>Fill out this form to get in touch with us.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Doe" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="john@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="support">Support</SelectItem>
                        <SelectItem value="billing">Billing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" placeholder="Your message here..." />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="newsletter" />
                    <Label htmlFor="newsletter">Subscribe to newsletter</Label>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Send Message</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Preferences</CardTitle>
                  <CardDescription>Configure your application preferences.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <Label>Theme Preference</Label>
                    <RadioGroup defaultValue="system">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="light" id="light" />
                        <Label htmlFor="light">Light</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="dark" id="dark" />
                        <Label htmlFor="dark">Dark</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="system" id="system" />
                        <Label htmlFor="system">System</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-3">
                    <Label>Volume</Label>
                    <Slider defaultValue={[50]} max={100} step={1} />
                  </div>

                  <div className="space-y-3">
                    <Label>Text Formatting</Label>
                    <ToggleGroup type="multiple">
                      <ToggleGroupItem value="bold">B</ToggleGroupItem>
                      <ToggleGroupItem value="italic">I</ToggleGroupItem>
                      <ToggleGroupItem value="underline">U</ToggleGroupItem>
                    </ToggleGroup>
                  </div>

                  <div className="space-y-3">
                    <Label>Quick Actions</Label>
                    <div className="flex space-x-2">
                      <Toggle aria-label="Toggle italic">
                        <Star className="h-4 w-4" />
                      </Toggle>
                      <Toggle aria-label="Toggle bold">
                        <Mail className="h-4 w-4" />
                      </Toggle>
                      <Toggle aria-label="Toggle underline">
                        <Calendar className="h-4 w-4" />
                      </Toggle>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full bg-transparent">
                    Save Preferences
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>

          {/* Accordion Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Accordion & Collapsible</h2>
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>Common questions and answers about our service.</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>How do I get started?</AccordionTrigger>
                    <AccordionContent>
                      Getting started is easy! Simply sign up for an account and follow our onboarding guide. You&apos;ll be up and running
                      in no time.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
                    <AccordionContent>
                      We accept all major credit cards, PayPal, and bank transfers. All payments are processed securely through our payment
                      partners.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Can I cancel my subscription anytime?</AccordionTrigger>
                    <AccordionContent>
                      Yes, you can cancel your subscription at any time from your account settings. There are no cancellation fees or
                      penalties.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4">
                    <AccordionTrigger>Do you offer customer support?</AccordionTrigger>
                    <AccordionContent>
                      We offer 24/7 customer support through email, chat, and phone. Our support team is always ready to help you with any
                      questions or issues.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>

          {/* Hover Cards and Tooltips */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Interactive Elements</h2>
            <Card>
              <CardHeader>
                <CardTitle>Hover Cards & Tooltips</CardTitle>
                <CardDescription>Interactive elements that provide additional information on hover.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <Button variant="link">@shadcn</Button>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <div className="flex justify-between space-x-4">
                        <Avatar>
                          <AvatarImage src="/placeholder.svg?height=40&width=40" />
                          <AvatarFallback>SC</AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                          <h4 className="text-sm font-semibold">@shadcn</h4>
                          <p className="text-sm">The React framework for production – created and maintained by @vercel.</p>
                          <div className="flex items-center pt-2">
                            <Calendar className="mr-2 h-4 w-4 opacity-70" />
                            <span className="text-xs text-muted-foreground">Joined December 2021</span>
                          </div>
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline">Hover for tooltip</Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>This is a helpful tooltip message</p>
                    </TooltipContent>
                  </Tooltip>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive">Delete Account</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction>Continue</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t bg-muted/50">
          <div className="container mx-auto px-8 py-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="font-semibold mb-4">Company</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Button variant="link" className="p-0 h-auto">
                      About
                    </Button>
                  </li>
                  <li>
                    <Button variant="link" className="p-0 h-auto">
                      Careers
                    </Button>
                  </li>
                  <li>
                    <Button variant="link" className="p-0 h-auto">
                      Contact
                    </Button>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Product</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Button variant="link" className="p-0 h-auto">
                      Features
                    </Button>
                  </li>
                  <li>
                    <Button variant="link" className="p-0 h-auto">
                      Pricing
                    </Button>
                  </li>
                  <li>
                    <Button variant="link" className="p-0 h-auto">
                      Documentation
                    </Button>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Resources</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Button variant="link" className="p-0 h-auto">
                      Blog
                    </Button>
                  </li>
                  <li>
                    <Button variant="link" className="p-0 h-auto">
                      Help Center
                    </Button>
                  </li>
                  <li>
                    <Button variant="link" className="p-0 h-auto">
                      Community
                    </Button>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Legal</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Button variant="link" className="p-0 h-auto">
                      Privacy
                    </Button>
                  </li>
                  <li>
                    <Button variant="link" className="p-0 h-auto">
                      Terms
                    </Button>
                  </li>
                  <li>
                    <Button variant="link" className="p-0 h-auto">
                      Security
                    </Button>
                  </li>
                </ul>
              </div>
            </div>
            <Separator className="my-8" />
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-muted-foreground">© 2024 Shadcn Template. All rights reserved.</p>
              <div className="flex space-x-4 mt-4 md:mt-0">
                <Badge variant="outline">v1.0.0</Badge>
                <Badge variant="secondary">Beta</Badge>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </TooltipProvider>
  );
}
