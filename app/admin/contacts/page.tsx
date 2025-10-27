'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
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

const statusOptions: Array<{ value: Contact['status'] | 'all'; label: string }> = [
  { value: 'all', label: '전체' },
  { value: 'new', label: '신규' },
  { value: 'read', label: '읽음' },
  { value: 'replied', label: '답변완료' },
]

export default function AdminContactsPage() {
  const router = useRouter()
  const [contacts, setContacts] = useState<Contact[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)
  const [statusFilter, setStatusFilter] = useState<'all' | Contact['status']>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [updatingId, setUpdatingId] = useState<string | null>(null)
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)

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
      console.error('문의 데이터를 불러오는데 실패했습니다:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const updateStatus = useCallback(
    async (id: string, newStatus: Contact['status']) => {
      setUpdatingId(id)
      try {
        const { error } = await supabase
          .from('contacts')
          .update({ status: newStatus })
          .eq('id', id)

        if (error) throw error
        await fetchContacts()
      } catch (error) {
        console.error('문의 상태를 업데이트하는데 실패했습니다:', error)
      } finally {
        setUpdatingId(null)
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
      console.error('로그아웃 중 오류가 발생했습니다:', error)
    }

    setContacts([])
    router.replace('/admin/login')
  }

  const filteredContacts = useMemo(() => {
    const normalizedQuery = searchTerm.trim().toLowerCase()

    return contacts.filter((contact) => {
      const matchesStatus = statusFilter === 'all' || contact.status === statusFilter

      if (!normalizedQuery) {
        return matchesStatus
      }

      const haystack = [
        contact.name,
        contact.email,
        contact.phone,
        contact.brand_names,
        contact.inquiry_content,
        contact.referral_source,
        contact.referral_other,
        ...(contact.inquiry_types ?? []),
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()

      return matchesStatus && haystack.includes(normalizedQuery)
    })
  }, [contacts, searchTerm, statusFilter])

  const stats = useMemo(() => {
    return {
      total: contacts.length,
      new: contacts.filter(c => c.status === 'new').length,
      read: contacts.filter(c => c.status === 'read').length,
      replied: contacts.filter(c => c.status === 'replied').length,
    }
  }, [contacts])

  if (isCheckingAuth) {
    return (
      <div className="container flex min-h-screen items-center justify-center py-12">
        <p className="text-muted-foreground">접근 권한을 확인하는 중입니다…</p>
      </div>
    )
  }

  return (
    <div className="container py-12">
      <div className="space-y-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="mb-1 text-4xl font-bold tracking-tight">문의 관리</h1>
            <p className="text-muted-foreground">문의 데이터를 확인하고 상태를 업데이트하세요.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={fetchContacts} disabled={isLoading}>
              {isLoading ? '불러오는 중…' : '새로고침'}
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              로그아웃
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
            <div className="space-y-1">
              <Label htmlFor="status-filter">상태 필터</Label>
              <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as typeof statusFilter)}>
                <SelectTrigger id="status-filter" className="w-full min-w-[200px] sm:w-[200px]">
                  <SelectValue placeholder="상태를 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label htmlFor="contact-search">검색</Label>
              <Input
                id="contact-search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="이름, 이메일, 브랜드 등으로 검색"
                className="w-full sm:w-[260px]"
              />
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            총 {filteredContacts.length}건 / 전체 {contacts.length}건
          </div>
        </div>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>문의 목록</CardTitle>
              <CardDescription>상태를 변경해 처리 현황을 관리하세요.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="py-8 text-center text-muted-foreground">문의 데이터를 불러오는 중입니다…</div>
          ) : contacts.length === 0 ? (
            <div className="py-8 text-center text-muted-foreground">등록된 문의가 없습니다.</div>
          ) : filteredContacts.length === 0 ? (
            <div className="py-8 text-center text-muted-foreground">조건에 맞는 문의가 없습니다.</div>
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
                    <TableHead>상태 변경</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredContacts.map((contact) => (
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
                        <Select
                          value={contact.status}
                          onValueChange={(value) => updateStatus(contact.id!, value as Contact['status'])}
                          disabled={updatingId === contact.id}
                        >
                          <SelectTrigger className="w-[140px]">
                            <SelectValue placeholder="상태 선택" />
                          </SelectTrigger>
                          <SelectContent>
                            {statusOptions
                              .filter((option) => option.value !== 'all')
                              .map((option) => (
                                <SelectItem key={option.value} value={option.value as Contact['status']}>
                                  {option.label}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
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
