import './face-recognition-gallery.css'
import Switch from '@mui/material/Switch';
import React, { useState } from "react";
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import { FiSettings } from 'react-icons/fi';
import dummyImg from '../../assets/fr-gallery-dummyimg.jpg'


const WhatsAppMessenger = () => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleOpenWhatsApp = () => {
    const cleanedPhoneNumber = phoneNumber.replace(/\D/g, "");

    if (cleanedPhoneNumber && /^\d+$/.test(cleanedPhoneNumber)) {
      const whatsappLink = `https://wa.me/${cleanedPhoneNumber}`

      try {
        // Open WhatsApp link in a new tab/window
        const newWindow = window.open(whatsappLink, "_blank");

        // Check if the new window was successfully opened
        if (
          !newWindow ||
          newWindow.closed ||
          typeof newWindow.closed === "undefined"
        ) {
          // Display a message suggesting to install the WhatsApp app
          alert(
            "WhatsApp web is blocked. Please consider installing the WhatsApp app."
          );
        }
      } catch (error) {
        // Handle the specific error when api.whatsapp.com is blocked
        if (error.message.includes("refused to connect")) {
          alert(
            "WhatsApp web is blocked. Please consider installing the WhatsApp app."
          );
        } else {
          // Handle other errors if needed
          console.error("Error opening WhatsApp link:", error);
        }
      }
    } else {
      alert("Please enter a valid phone number.");
    }
  };

  return (
    <div>
      <h1>WhatsApp Messenger</h1>
      <label htmlFor="phoneNumber">Enter WhatsApp Number:</label>
      <input
        type="text"
        id="phoneNumber"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />

      <button onClick={handleOpenWhatsApp}>Open WhatsApp</button>
    </div>
  );
};


const FaceRecognitionGallery = () => {
  const [form, setForm] = useState({
    fullEventAccess: false, whatsappAccess: false,
    aiGalleryAccess: false, anyOneFaceSearchAccess: false,
    clientEmail: false, QRCode: false
  });

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.checked });
    console.log(event.target.name, event.target.checked)
  };



  return (
    <div className="fr-gallery-wrapper">
      <section className="fr-gallery-header">
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
      <section className='fr-gallery-main'>
        <div className='fr-gallery-main-lb'>
          <h6>WHATSAPP / EMAIL PREVIEW</h6>
          <div className='fr-gallery-main-lb-img-container'>
            <img src={dummyImg} alt='userImg' />
          </div>
          <h4 className='fr-gallery-main-lb-clientname'>AKSHAYANJALI</h4>
          <div>
            <textarea className='fr-gallery-main-lb-textarea'
              placeholder='Edit Maximum 150 Characters for client email/Qr' />
          </div>
          <p className='fr-gallery-main-lb-sharewithclient'>Share with client<br />
            <span>PIN: 7478</span>
          </p>
        </div>
        <div className='fr-gallery-main-rb'>
          <div className='r1'>
            <h6>GENERAL ACCESS</h6>
            <section>
              <div className='r1-lb'>
                <section>
                  <div>
                    <p>Full event access</p>
                    <p>
                      <Switch
                        checked={form.fullEventAccess}
                        onChange={handleChange}
                        name="fullEventAccess"
                        color="primary"
                      />
                    </p>
                  </div>
                  <p>Anyone on the internet with the pin can view download</p>
                  <div>
                    <p>Whatsapp access</p>
                      <p>
                        <Switch
                          checked={form.whatsappAccess}
                          onChange={handleChange}
                          name="whatsappAccess"
                          inputProps={{ 'aria-label': 'secondary checkbox' }}
                          color="primary"
                        />
                      </p>
                    
                  </div>
                </section>
              </div>
              <div className='r1-rb'>
                <section>
                  <div>
                    <p>
                      <div>
                        Ai gallery access
                      </div>
                      <div>
                        <Switch
                          checked={form.aiGalleryAccess}
                          onChange={handleChange}
                          name="aiGalleryAccess"
                          color="primary"
                        />
                      </div>
                    </p>
                    <p>Only people with access can download Ai gallery</p>
                  </div>
                  <div>
                    <p>
                      <div>
                        Anyone Face search access
                      </div>
                      <div>
                        <Switch
                          checked={form.anyOneFaceSearchAccess}
                          onChange={handleChange}
                          name="anyOneFaceSearchAccess"
                          color="primary"
                        />
                      </div>
                    </p>
                  </div>
                </section>
              </div>
            </section>
          </div>
          <div className='r2'>
            <h6>CHOOSE TO SHARE</h6>
            <section>
              <div>
                <div>
                  Client email
                </div>
                <div>
                  <Switch
                    checked={form.clientEmail}
                    onChange={handleChange}
                    name="clientEmail"
                    color="primary"
                  />
                </div>
              </div>
              <div>
                <div>
                  Direct link/QR code
                </div>
                <div className='qr-block'>
                  <img src="" alt="" className='qr-img' />
                  <p>
                    <button id='fc-gallery-qr-code-download-btn'>
                      Download
                    </button>
                  </p>
                </div>
                <div>
                  <Switch
                    checked={form.QRCode}
                    onChange={handleChange}
                    name="QRCode"
                    color="primary"
                  />
                </div>
              </div>
            </section>
          </div>
          <div className='r3'>
            <h6>INVITE PEOPLE</h6>
            <div>
              <section>
                <div>
                  Share with client
                </div>
                <div>
                  <textarea />
                </div>
                <p>copy link</p>
              </section>
              <section>
                <WhatsAppMessenger/>
                <div>
                  <textarea />
                </div>
              </section>
            </div>
          </div>
          <div id='face-gallery-form-save-btn'>
            <button>
              Save
            </button>
          </div>
        </div>
      </section>
    </div>

  )
}

export default FaceRecognitionGallery;