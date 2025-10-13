import Container from './Container.jsx'

export default function Footer() {
  return (
    <footer style={{ marginTop: 40, borderTop: '1px solid var(--border)', background: 'var(--surface)' }}>
      <Container>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', color: 'var(--muted)' }}>
          <div>© {new Date().getFullYear()} Hanumat Tekari</div>
          <div style={{ fontSize: 14 }}>Built with React + Express</div>
        </div>
      </Container>
    </footer>
  )
}


