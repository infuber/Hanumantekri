import AdminLayout from '../components/admin/AdminLayout'
import AreasManager from '../components/admin/AreasManager'
import StoriesManager from '../components/admin/StoriesManager'
import ChalisaManager from '../components/admin/ChalisaManager'

export default function AdminPage() {
  return (
    <AdminLayout>
      {({ activeTab }) => {
        switch (activeTab) {
          case 'areas':
            return <AreasManager />
          case 'stories':
            return <StoriesManager />
          case 'chalisa':
            return <ChalisaManager />
          default:
            return null
        }
      }}
    </AdminLayout>
  )
}
