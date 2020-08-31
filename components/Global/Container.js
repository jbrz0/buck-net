function Container(props) {
  return <div className="container mx-auto
  grid grid-cols-6 xl:grid-cols-5 gap-4 xl:gap-6 py-24 xl:py-auto">
    {props.children}
  </div>
}

export default Container
