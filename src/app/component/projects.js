import React from 'react'

const projects = () => {
    const projectsData = [
        {
            project_name:"",
            project_details:[{},{}],
            project_owner:"client",
            project_url:"client ",
        },
    ]
  return (
    <>
    <scetion id="projects">
        <div className='wrapper'>
            <h2 className='text-5xl '>Recent Live Projects </h2>
        </div>
    </scetion>
    </>
  )
}

export default projects