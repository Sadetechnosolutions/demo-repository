import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Sliper() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
  };
  return (
    <div className="bg-black min-h-screen">
    <div className='w-3/4 m-auto bg-black'>
      <Slider {...settings}>
        {data.map((d) => (
          <div key={d.id} className="bg-white h-[290px]  text-black rounded-xl">
            <div className="flex flex-col items-center justify-center gap-4 p-4">
              <p className="text-xl font-semibold">{d.Name}</p>
              <p className="text-center">{d.content}</p>
              <button className='bg-indigo-500 text-white text-lg px-6 py-1 rounded-xl'>Read More</button>
            </div>
          </div>
        ))}
      </Slider>
      
    </div>
    </div>
  );
}

const data = [
    {
      id: 1,
      Name: 'IT Consultancy',
      content: 'Revamp Your Business with Smart IT Strategies from Sade Tech. At Sade Tech, we have years of industry experience and can help propel your business by discovering scaling opportunities. We specialize in everything from IT infrastructure.'
    },
    {
      id: 2,
      Name: 'QA & Testing',
      img: 'back.jpeg',
      content: 'Our Sade techno services are designed to ensure that software and business projects attain superior standards of performance, reliability, and user satisfaction. We provide businesses with expert guidance and support to enable them to enhance the quality.'
    },
    {
      id: 3,
      Name: 'UX/UI Design',
      img: 'back.jpeg',
      content: 'Elevate your software products with cutting-edge UI/UX design services that enhance user engagement and boost revenue. Our skilled team at a leading UI/UX Design Company delivers stunning designs that drive growth and maximize customer satisfaction.'
    },
    {
      id: 4,
      Name: 'Mobile App Development',
      img: 'back.jpeg',
      content: 'Explore the ever-evolving realm of mobile technology through Sade Techno Mobile App Development Services. Our expertise lies in creating bespoke mobile applications that deliver a seamless user experience coupled with powerful functionality.'
    },
    {
      id: 5,
      Name: 'Web Application Development',
      img: 'back.jpeg',
      content: 'At Sade techno solutions, we help companies evolve into dynamic, forward-thinking organizations that thrive in an ever-changing landscape. We dig deep, gain valuable insights, and have the courage to take decisive action.'
    },
    {
      id: 6,
      Name: 'SaaS Product Development',
      img: 'back.jpeg',
      content: 'Using an end-to-end approach to developing products, we can build an end-to-end SaaS solution that includes web apps, APIs, storage capabilities, and data analytics in order to meet the complex business requirements.'
    },
    {
      id: 7,
      Name: 'Digital Marketing',
      img: 'back.jpeg',
      content: 'Transform your brand online presence with Sade techno innovative digital marketing services. Through the development of captivating storylines and purposeful strategies, we take your brand and position it in a distinctive way within the vast digital world.'
    },
    {
      id: 8,
      Name: 'IT Security Services',
      img: 'back.jpeg',
      content: 'Our comprehensive IT security and disaster recovery services are tailor-made to safeguard your crucial IT environment against potential threats. Our team of experts can conduct vulnerability assessments and provide ongoing security support to ensure.'
    }
  ];
  
export default Sliper;