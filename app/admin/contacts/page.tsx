'use client'

import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Contact, supabase } from '@/lib/supabase'

const getStatusVariant = (status: string): 'default' | 'secondary' | 'destructive' | 'outline' => {
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

export default function AdminContactsPage() {
  const router = useRouter()
  const [contacts, setContacts] = useState<Contact[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)

  const fetchContacts = useCallback(async () => {
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
  }, [])

  const updateStatus = useCallback(
    async (id: string, newStatus: 'new' | 'read' | 'replied') => {
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
    },
    [fetchContacts],
  )

  useEffect(() => {
    let active = true

    const ensureSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!active) return

      if (!session) {
        router.replace('/admin/login')
        return
      }

      setIsCheckingAuth(false)
      fetchContacts()
    }

    ensureSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.replace('/admin/login')
      }
    })

    return () => {
      active = false
      subscription.unsubscribe()
    }
  }, [fetchContacts, router])

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Error signing out:', error)
    }

    setContacts([])
    router.replace('/admin/login')
  }

  if (isCheckingAuth) {
    return (
      <div className="container flex min-h-screen items-center justify-center py-12">
        <p className="text-muted-foreground">접근 권한을 확인하는 중입니다…</p>
      </div>
    )
  }

  return (
    <div className="container py-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="mb-2 text-4xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage contact inquiries</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={fetchContacts}>
            Refresh
          </Button>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Contact Messages</CardTitle>
              <CardDescription>{contacts.length} total message(s)</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="py-8 text-center text-muted-foreground">Loading...</div>
          ) : contacts.length === 0 ? (
            <div className="py-8 text-center text-muted-foreground">No messages yet</div>
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
                        <div className="space-y-1 text-xs">
                          {contact.inquiry_types?.map((type, index) => (
                            <div key={`${contact.id}-${index}`} className="truncate">
                              {type}
                            </div>
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
                      <TableCell className="whitespace-nowrap text-sm text-muted-foreground">
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
