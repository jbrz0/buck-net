function Container(props) {
  return <div className="container mx-auto grid grid-cols-5 gap-4">
    {props.children}
  </div>
}

export default Container
