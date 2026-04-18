const AuditLog = require('../models/AuditLog');
const { normalizeRole } = require('../utils/roles');
const logger = require('../utils/logger');

function getIpAddress(req) {
  const forwardedFor = req?.headers?.['x-forwarded-for'];

  if (typeof forwardedFor === 'string' && forwardedFor.trim()) {
    return forwardedFor.split(',')[0].trim();
  }

  return req?.ip || req?.socket?.remoteAddress || null;
}

function logAction({ user, action, metadata = {}, req }) {
  const userId = user?._id || user?.id || user?.userId || null;
  const role = user?.role ? normalizeRole(user.role) : null;
  const ipAddress = getIpAddress(req);

  setImmediate(async () => {
    try {
      await AuditLog.create({
        userId,
        role,
        action,
        metadata,
        ipAddress,
      });
    } catch (error) {
      logger.warn('audit_log_failed', {
        action,
        userId: userId ? String(userId) : null,
        message: error.message,
      });
    }
  });
}

module.exports = {
  logAction,
};
