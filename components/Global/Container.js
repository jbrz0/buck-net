function Container(props) {
  return <div className="container mx-auto grid grid-cols-5 gap-6">
    {props.children}
  </div>
}

export default Container
