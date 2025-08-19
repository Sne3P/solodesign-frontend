// Route API pour vérifier la santé de l'application
export async function GET() {
  const healthStatus = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    uptime: process.uptime(),
    memory: process.memoryUsage(),
  };

  return Response.json(healthStatus, {
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  });
}
