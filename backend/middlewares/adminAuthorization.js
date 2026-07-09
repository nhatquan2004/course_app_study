function adminAuthorization(req, res, next) {
    if (!req.user) {
        return res.status(401).json({
            status: 401,
            message: 'Bạn chưa đăng nhập xác thực tài khoản!'
        });
    }

    if (req.user.role !== 'admin') {
        return res.status(403).json({
            status: 403,
            message: 'Bạn không có quyền admin để thực hiện hành động này!'
        });
    }

    next();
}

module.exports = adminAuthorization;
