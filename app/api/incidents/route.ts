import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const data = await req.json()
    
    const incident = await prisma.incident.create({
      data: {
        ...data,
        casualties: parseInt(data.casualties),
        date: new Date(data.date),
        userId: session.user.id
      }
    })

    return NextResponse.json(incident)
  } catch (error) {
    console.error(error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}