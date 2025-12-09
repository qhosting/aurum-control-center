import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { action, timestamp } = await request.json()
    
    // En una implementación real, aquí consultarías la API de n8n
    // o una base de datos donde se almacenan los logs
    
    if (action === 'get_logs') {
      // Simular logs de n8n
      const mockLogs = [
        {
          id: 'log-001',
          flowId: 'flow-001',
          flowName: 'WhatsApp Auto Reply',
          error: 'Connection timeout to WhatsApp API',
          status: 'error',
          timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
          duration: 30000,
          executionId: 'exec-001'
        },
        {
          id: 'log-002',
          flowId: 'flow-002',
          flowName: 'CRM Sync',
          error: 'Database connection failed',
          status: 'error',
          timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
          duration: 5000,
          executionId: 'exec-002'
        },
        {
          id: 'log-003',
          flowId: 'flow-003',
          flowName: 'Email Marketing',
          error: 'Rate limit exceeded for email service',
          status: 'warning',
          timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
          duration: 15000,
          executionId: 'exec-003'
        }
      ]
      
      return NextResponse.json({
        success: true,
        logs: mockLogs,
        timestamp: new Date().toISOString()
      })
    }
    
    return NextResponse.json({
      success: true,
      message: 'Action processed successfully',
      timestamp: new Date().toISOString()
    })
    
  } catch (error) {
    console.error('n8n Health API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}