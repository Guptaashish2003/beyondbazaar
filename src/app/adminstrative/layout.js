

function AdminstrativeLayout({children,params}) {
    params.isAdmin = true;
  return (
    <div>
      {children}
    </div>
  )
}

export default AdminstrativeLayout
