// app/api/blog/route.js
import pool from '../db.js'; // 引入数据库连接模块

export async function GET (request) {

    const { searchParams } = new URL(request.url);
    const tags = searchParams.get("tags");
    try {
        // 编写 SQL 查询语句
        const sql = 'SELECT *, (SELECT COUNT(*) FROM comments WHERE comments.blog_id = blog.id) AS comment_count FROM blog where tags=?';

        // 执行查询并获取结果
        const [results] = await pool.query(sql, [tags]);

        // 返回 JSON 响应
        return new Response(JSON.stringify(results), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        // 错误处理
        console.error('Database error:', error);
        return new Response('Internal Server Error', {
            status: 500
        });
    }
}
