import './face-recognition-gallery.css'
import Switch from '@mui/material/Switch';
import { useState } from 'react';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import { FiSettings } from 'react-icons/fi';
import dummyImg from '../../assets/fr-gallery-dummyimg.jpg'

const FaceRecognitionGallery = () => {
  const [form, setForm] = useState({
    fullEventAccess: false, faceSearc: false, whatsappAccess: false,
    clientEmail: false, QRCode: false
  });

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.checked });
    console.log(event.target.name, event.target.checked)
  };

  return (
    <div className="fr-gallery-wrapper  ">
      <section className="fr-gallery-header ">
        <div className='fr-gallery-header-lb'>
          <button>
            <MdOutlineArrowBackIosNew />
          </button>
          <button>
            Share with client
          </button>
        </div>
        <div className='fr-gallery-header-rb'>
          <button>
            <span><FiSettings /></span>
            <span>Dashboard Settings</span>
          </button>
        </div>
      </section>
      <section className='fr-gallery-main '>
        <div className='fr-gallery-main-lb'>
          <h6>WHATSAPP / EMAIL PREVIEW</h6>
          <div className='fr-gallery-main-lb-img-container'>
            <img src={dummyImg} alt='userImg' />
          </div>
          {/* <h4 className='fr-gallery-main-lb-clientname'>AKSHAYANJALI</h4> */}
          {/* <div>
            <textarea className='fr-gallery-main-lb-textarea'
              placeholder='Edit Maximum 150 Characters for client email/Qr' />
          </div> */}
          <div className='flex flex-col gap-2 justify-center h-[5rem] pt-4 '>
            <h4 className='font-bold'>Share with client</h4>
            <span>PIN: 7478</span>
          </div>
        </div>
        <div className='fr-gallery-main-rb'>
          <h6 className='text-center text-md'>GENERAL SETTINGS</h6>
          <div className='r1'>
            <div className='flex flex-col gap-4'>
              <div className='flex justify-between'>
                <div className='flex justify-between'>
                  <h6>Full event access</h6>
                  <div>
                    <Switch
                      checked={form.fullEventAccess}
                      onChange={handleChange}
                      name="fullEventAccess"
                      color="primary"
                    />
                  </div>
                </div>
                <div className='flex justify-between'>
                  <h6>Face Search</h6>
                  <div>
                    <Switch
                      checked={form.fullEventAccess}
                      onChange={handleChange}
                      name="fullEventAccess"
                      color="primary"
                    />
                  </div>
                </div>
              </div>
              <div className='flex justify-between'>
                <div className='flex justify-between'>
                  <h6>Client email</h6>
                  <div>
                    <Switch
                      checked={form.fullEventAccess}
                      onChange={handleChange}
                      name="fullEventAccess"
                      color="primary"
                    />
                  </div>
                </div>
                <div className='flex justify-between '>
                  <h6>client whats app</h6>
                  <div>
                    <Switch
                      checked={form.fullEventAccess}
                      onChange={handleChange}
                      name="fullEventAccess"
                      color="primary"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='py-6 '>
            <h6 className='text-center text-md'>CHOOSE SAHRING OPTIONS</h6>
            <div className='flex justify-center gap-[10rem] py-[2rem]'>
              <div>
                <img src={'https://th.bing.com/th?id=OIP.CKXBqkgG-DU3EG864iMU2AHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2'} className='w-[7rem] h-[7rem]' />
                <h6 className='text-center'>Full access</h6>
                <p className='py-2 text-xs font-bold text-center underline underline-offset-4'>COPY LINK</p>
              </div>
              <div>
                <img src={'https://th.bing.com/th?id=OIP.CKXBqkgG-DU3EG864iMU2AHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2'} className='w-[7rem] h-[7rem]' />
                <h6 className='text-center'>Face Seacrh</h6>
                <p className='py-2 text-xs font-bold text-center underline underline-offset-4'>COPY LINK</p>
              </div>
            </div>
          </div>

          {/* share with clients */}
          <div className='flex justify-between'>
            <div>
              <h5>share with clients</h5>
              <div className=' space-x-5'>
                <input type='email' placeholder='Client Email' className='border-[1px] border-gray-400 rounded-md px-1 py-1.5' />
                <button className='bg-gray-200 rounded-md w-[2rem] h-[2rem] tetxt-xl font-bold text-center'>+</button>
              </div>
            </div>
          </div>

          <div id='face-gallery-form-save-btn'>
            <button>
              Save
            </button>
          </div>
        </div>
      </section >
    </div >

  )
}

export default FaceRecognitionGallery;
