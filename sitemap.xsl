<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
    <xsl:template match="/">
        <html xmlns="http://www.w3.org/1999/xhtml">
            <head>
                <title>XML Sitemap | Kazim Ahmad</title>
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;600;800&amp;family=Inter:wght@400;500;600&amp;display=swap" rel="stylesheet" />
                <style type="text/css">
                    :root {
                        --color-bg: #09090b;
                        --color-card: #18181b;
                        --color-accent: #e4e4e7;
                        --color-text-primary: #fafafa;
                        --color-text-secondary: #a1a1aa;
                        --color-border: #27272a;
                    }
                    body {
                        font-family: 'Inter', system-ui, -apple-system, sans-serif;
                        font-size: 14px;
                        color: var(--color-text-secondary);
                        background-color: var(--color-bg);
                        margin: 0;
                        padding: 40px 20px;
                    }
                    .container {
                        max-width: 800px;
                        margin: 0 auto;
                    }
                    header {
                        margin-bottom: 40px;
                        padding-bottom: 20px;
                        border-bottom: 1px solid var(--color-border);
                    }
                    h1 {
                        font-family: 'Hanken Grotesk', sans-serif;
                        font-size: 24px;
                        font-weight: 800;
                        color: var(--color-text-primary);
                        margin: 0 0 8px 0;
                        letter-spacing: -0.02em;
                    }
                    p {
                        margin: 0;
                        color: var(--color-text-secondary);
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        background-color: var(--color-card);
                        border-radius: 12px;
                        overflow: hidden;
                        border: 1px solid var(--color-border);
                    }
                    th {
                        text-align: left;
                        padding: 16px;
                        background-color: rgba(255,255,255,0.02);
                        color: var(--color-text-primary);
                        font-weight: 600;
                        border-bottom: 1px solid var(--color-border);
                    }
                    td {
                        padding: 16px;
                        border-bottom: 1px solid var(--color-border);
                    }
                    tr:last-child td {
                        border-bottom: none;
                    }
                    a {
                        color: var(--color-accent);
                        text-decoration: none;
                        transition: color 0.2s ease;
                    }
                    a:hover {
                        color: var(--color-text-primary);
                        text-decoration: underline;
                    }
                    .priority-badge {
                        display: inline-block;
                        padding: 2px 8px;
                        background-color: rgba(255,255,255,0.05);
                        border-radius: 4px;
                        font-size: 12px;
                        font-weight: 500;
                    }
                    footer {
                        margin-top: 40px;
                        text-align: center;
                        font-size: 12px;
                        color: var(--color-text-muted);
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <header>
                        <h1>XML Sitemap</h1>
                        <p>Total URLs: <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></p>
                    </header>
                    <table>
                        <thead>
                            <tr>
                                <th>URL</th>
                                <th>Last Modified</th>
                                <th>Change Frequency</th>
                                <th>Priority</th>
                            </tr>
                        </thead>
                        <tbody>
                            <xsl:for-each select="sitemap:urlset/sitemap:url">
                                <tr>
                                    <td>
                                        <a href="{sitemap:loc}">
                                            <xsl:value-of select="sitemap:loc"/>
                                        </a>
                                    </td>
                                    <td><xsl:value-of select="sitemap:lastmod"/></td>
                                    <td><xsl:value-of select="sitemap:changefreq"/></td>
                                    <td><span class="priority-badge"><xsl:value-of select="sitemap:priority"/></span></td>
                                </tr>
                            </xsl:for-each>
                        </tbody>
                    </table>
                    <footer>
                        &copy; 2026 Kazim Ahmad Portfolio. Generated for Google Search Console.
                    </footer>
                </div>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>
