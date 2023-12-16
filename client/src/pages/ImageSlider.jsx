

import PropTypes from 'prop-types';

function ImageSlider({images}) {
    console.log(images)
  return (
   <div className='h-1/3 flex flex-wrap gap-2'>
   {
    images.map((img)=>(
        <img key={img} src={img} alt="img" className='w-48'/>
    ))
   }
   </div>
  


  );
}
ImageSlider.propTypes = {
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
  };
export default ImageSlider;