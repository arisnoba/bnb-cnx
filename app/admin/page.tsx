'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { supabase, Contact } from '@/lib/supabase'

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [contacts, setContacts] = useState<Contact[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    // Check if already authenticated
    const auth = localStorage.getItem('admin-auth')
    if (auth === 'true') {
      setIsAuthenticated(true)
      fetchContacts()
    }
  }, [])

  const handleLogin = () => {
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123'
    if (password === adminPassword) {
      localStorage.setItem('admin-auth', 'true')
      setIsAuthenticated(true)
      fetchContacts()
      setError('')
    } else {
      setError('Incorrect password')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('admin-auth')
    setIsAuthenticated(false)
    setPassword('')
    setContacts([])
  }

  const fetchContacts = async () => {
    setIsLoading(true)
    try {
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setContacts(data || [])
    } catch (error) {
      console.error('Error fetching contacts:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const updateStatus = async (id: string, newStatus: 'new' | 'read' | 'replied') => {
    try {
      const { error } = await supabase
        .from('contacts')
        .update({ status: newStatus })
        .eq('id', id)

      if (error) throw error
      fetchContacts()
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  const getStatusVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case 'new':
        return 'destructive'
      case 'read':
        return 'secondary'
      case 'replied':
        return 'default'
      default:
        return 'outline'
    }
  }

  const getStatusLabel = (status: string): string => {
    switch (status) {
      case 'new':
        return '신규'
      case 'read':
        return '읽음'
      case 'replied':
        return '답변완료'
      default:
        return status
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="container flex items-center justify-center min-h-[calc(100vh-200px)]">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Admin Login</CardTitle>
            <CardDescription>Enter your password to access the admin dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                  placeholder="Enter admin password"
                />
              </div>
              {error && (
                <div className="p-3 bg-red-50 text-red-800 rounded-md text-sm">
                  {error}
                </div>
              )}
              <Button onClick={handleLogin} className="w-full">
                Login
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container py-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage contact inquiries</p>
        </div>
        <Button variant="outline" onClick={handleLogout}>
          Logout
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Contact Messages</CardTitle>
              <CardDescription>
                {contacts.length} total message(s)
              </CardDescription>
            </div>
            <Button onClick={fetchContacts} variant="outline" size="sm">
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8 text-muted-foreground">Loading...</div>
          ) : contacts.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No messages yet
            </div>
          ) : (
<div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>문의 유형</TableHead>
                    <TableHead>성함</TableHead>
                    <TableHead>연락처</TableHead>
                    <TableHead>이메일</TableHead>
                    <TableHead>브랜드명</TableHead>
                    <TableHead>문의 내용</TableHead>
                    <TableHead>유입 경로</TableHead>
                    <TableHead>상태</TableHead>
                    <TableHead>일시</TableHead>
                    <TableHead>액션</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contacts.map((contact) => (
                    <TableRow key={contact.id}>
                      <TableCell className="max-w-[200px]">
                        <div className="text-xs space-y-1">
                          {contact.inquiry_types?.map((type, idx) => (
                            <div key={idx} className="truncate">{type}</div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{contact.name}</TableCell>
                      <TableCell>{contact.phone}</TableCell>
                      <TableCell>{contact.email}</TableCell>
                      <TableCell className="max-w-[150px] truncate">{contact.brand_names}</TableCell>
                      <TableCell className="max-w-[200px] truncate">{contact.inquiry_content}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {contact.referral_source}
                          {contact.referral_other && (
                            <div className="text-xs text-muted-foreground">({contact.referral_other})</div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusVariant(contact.status)}>
                          {getStatusLabel(contact.status)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                        {contact.created_at
                          ? new Date(contact.created_at).toLocaleString('ko-KR')
                          : '-'}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          {contact.status === 'new' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateStatus(contact.id!, 'read')}
                            >
                              읽음
                            </Button>
                          )}
                          {contact.status === 'read' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateStatus(contact.id!, 'replied')}
                            >
                              답변완료
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
