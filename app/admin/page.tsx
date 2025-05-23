"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Mail, MoreHorizontal, Search, Trash2, User, Users } from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("")

  // Mock data for waitlist entries
  const waitlistEntries = [
    { id: 1, name: "John Smith", email: "john@example.com", date: "2023-05-21", status: "New" },
    { id: 2, name: "Sarah Johnson", email: "sarah@example.com", date: "2023-05-21", status: "New" },
    { id: 3, name: "Michael Brown", email: "michael@example.com", date: "2023-05-20", status: "Contacted" },
    { id: 4, name: "Emily Davis", email: "emily@example.com", date: "2023-05-20", status: "New" },
    { id: 5, name: "David Wilson", email: "david@example.com", date: "2023-05-19", status: "Contacted" },
    { id: 6, name: "Jessica Taylor", email: "jessica@example.com", date: "2023-05-19", status: "New" },
    { id: 7, name: "Andrew Miller", email: "andrew@example.com", date: "2023-05-18", status: "New" },
    { id: 8, name: "Olivia Moore", email: "olivia@example.com", date: "2023-05-18", status: "Contacted" },
    { id: 9, name: "James Anderson", email: "james@example.com", date: "2023-05-17", status: "New" },
    { id: 10, name: "Sophia Thomas", email: "sophia@example.com", date: "2023-05-17", status: "New" },
  ]

  // Filter entries based on search term
  const filteredEntries = waitlistEntries.filter(
    (entry) =>
      entry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white">
      <header className="border-b border-gray-800 bg-gray-900/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
              BiteCount
            </span>
            <span className="text-sm text-gray-400">Admin</span>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
              <Link href="/">View Site</Link>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 bg-gray-800">
                  <User className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700 text-gray-200">
                <DropdownMenuLabel>Admin User</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-700" />
                <DropdownMenuItem className="hover:bg-gray-700">Profile</DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-gray-700">Settings</DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-700" />
                <DropdownMenuItem className="hover:bg-gray-700">Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-gray-400">Manage your waitlist and user data</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
            <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white border-0">
              <Mail className="h-4 w-4 mr-2" />
              Send Campaign
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-gray-200">Total Subscribers</CardTitle>
              <CardDescription className="text-gray-400">All-time waitlist signups</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Users className="h-8 w-8 text-green-400 mr-3" />
                <div className="text-3xl font-bold">243</div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-gray-200">New This Week</CardTitle>
              <CardDescription className="text-gray-400">Recent waitlist signups</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Users className="h-8 w-8 text-blue-400 mr-3" />
                <div className="text-3xl font-bold">37</div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-gray-200">Conversion Rate</CardTitle>
              <CardDescription className="text-gray-400">Visitors to signups</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="h-8 w-8 text-purple-400 mr-3 flex items-center justify-center text-xl font-bold">%</div>
                <div className="text-3xl font-bold">12.4%</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="waitlist" className="mb-8">
          <TabsList className="bg-gray-800 border border-gray-700">
            <TabsTrigger value="waitlist" className="data-[state=active]:bg-gray-700">
              Waitlist
            </TabsTrigger>
            <TabsTrigger value="campaigns" className="data-[state=active]:bg-gray-700">
              Email Campaigns
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-gray-700">
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="waitlist" className="mt-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <CardTitle>Waitlist Entries</CardTitle>
                  <div className="relative">
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search by name or email..."
                      className="pl-8 bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 w-full md:w-64"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border border-gray-700 overflow-hidden">
                  <Table>
                    <TableHeader className="bg-gray-700/50">
                      <TableRow className="hover:bg-gray-700/70 border-gray-700">
                        <TableHead className="text-gray-300">ID</TableHead>
                        <TableHead className="text-gray-300">Name</TableHead>
                        <TableHead className="text-gray-300">Email</TableHead>
                        <TableHead className="text-gray-300">Date</TableHead>
                        <TableHead className="text-gray-300">Status</TableHead>
                        <TableHead className="text-gray-300 text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredEntries.map((entry) => (
                        <TableRow key={entry.id} className="hover:bg-gray-700/30 border-gray-700">
                          <TableCell className="font-medium">{entry.id}</TableCell>
                          <TableCell>{entry.name}</TableCell>
                          <TableCell>{entry.email}</TableCell>
                          <TableCell>{entry.date}</TableCell>
                          <TableCell>
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${
                                entry.status === "New"
                                  ? "bg-green-500/20 text-green-400"
                                  : "bg-blue-500/20 text-blue-400"
                              }`}
                            >
                              {entry.status}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700 text-gray-200">
                                <DropdownMenuItem className="hover:bg-gray-700">View Details</DropdownMenuItem>
                                <DropdownMenuItem className="hover:bg-gray-700">Send Email</DropdownMenuItem>
                                <DropdownMenuSeparator className="bg-gray-700" />
                                <DropdownMenuItem className="text-red-400 hover:bg-red-500/10 hover:text-red-300">
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <div className="text-sm text-gray-400">
                    Showing {filteredEntries.length} of {waitlistEntries.length} entries
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800"
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800"
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="campaigns" className="mt-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle>Email Campaigns</CardTitle>
                <CardDescription className="text-gray-400">Manage your email marketing campaigns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <p className="text-gray-400 mb-4">No campaigns have been created yet.</p>
                  <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white border-0">
                    Create Campaign
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle>Analytics</CardTitle>
                <CardDescription className="text-gray-400">Track your waitlist performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <p className="text-gray-400 mb-4">Analytics dashboard is coming soon.</p>
                  <Button variant="outline" className="bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800">
                    Export Raw Data
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="bg-gray-800/50 border-gray-700 mb-8">
          <CardHeader>
            <CardTitle>Admin Guide</CardTitle>
            <CardDescription className="text-gray-400">How to manage your waitlist data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Accessing Waitlist Data</h3>
                <p className="text-gray-300">
                  All waitlist entries are stored in your database and can be accessed through this admin dashboard. You
                  can search, filter, and export the data as needed.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Sending Email Campaigns</h3>
                <p className="text-gray-300">
                  Use the "Send Campaign" button to create and send email campaigns to your waitlist subscribers. You
                  can segment your audience based on signup date or other criteria.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Exporting Data</h3>
                <p className="text-gray-300">
                  Click the "Export Data" button to download a CSV file containing all waitlist entries. This can be
                  imported into other marketing tools or CRM systems.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Managing Entries</h3>
                <p className="text-gray-300">
                  You can view details, send individual emails, or delete entries using the actions menu for each
                  waitlist entry.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <footer className="border-t border-gray-800 py-6">
        <div className="container mx-auto px-4">
          <p className="text-gray-400 text-sm text-center">
            &copy; {new Date().getFullYear()} BiteCount Admin Dashboard. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
