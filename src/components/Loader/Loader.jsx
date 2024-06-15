import React, { useContext } from 'react';

//SCSS
import './loader-style.scss';

export default function Loader() {

  return (
    <div className="loader purple-green-gradient">
      <div className="loader-content">
        {/* <p className="welcome-text">generating</p> */}
        <div className="loader-circle-images">
          {/* <img
            src={`${process.env.REACT_APP_CONTENT}/images/circle.svg`}
            className="circle-img-loader"
            alt="circle"
          /> */}


          <div className="icon circle circle-img1 circle-loader">
            <svg id="etDsHKTlJvu1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 480" shape-rendering="geometricPrecision" text-rendering="geometricPrecision"><g clip-path="url(#etDsHKTlJvu5)"><g transform="matrix(.952966 0 0 0.945825 11.287972 13.002)"><path d="M90.4242,48.6498h13.8388v-6.9798h6.996v-6.9397h13.952v-6.9075h13.815v-7.0601h13.983v-6.9236h20.932v-6.93158h34.786v-6.90752h62.674v6.93161h34.69v6.86739h20.859v6.9155h13.896v7.036h14.064v6.8995h13.799v6.8834h6.979v7.1164h13.912v6.8352h7.044v7.0119h6.827v7.0361h7.02v6.7629h6.964v7.0923h6.907v7.0199h7.061v13.8069h6.867v6.98h6.883v13.992h7.141v13.799h6.883v13.975h6.884v20.892h7.028v41.734h6.883v48.666h-6.723v41.726h-7.076v20.883h-6.883v13.96h-6.98v14.048h-7.06v13.839h-6.828v7.044h-7.003v6.819h-7.036v14h-6.796v6.827h-7.011v7.052h-7.004v6.948h-6.892v6.867h-13.992v7.108h-6.899v6.932h-6.972v6.827h-13.823v7.124h-14.128v6.972h-13.879v6.827h-20.892v7.077h-41.798v6.867h-48.594v-6.787h-41.734v-7.028h-20.819v-6.883h-14.112v-6.956h-13.799v-7.06h-13.847v-6.892h-7.109v-6.947h-13.7985v-7.061h-7.02v-6.827h-7.036v-7.028h-6.8272v-7.02h-7.036v-6.827h-7.02v-7.044h-6.7549v-13.751h-7.1243v-7.14h-6.9558v-13.799h-6.8272v-13.992h-7.1083v-13.976h-6.9235v-20.859h-6.8674v-34.682h-7.0039v-62.601h6.87539v-34.859h6.85931v-20.859h6.9878v-14.048h7.0682v-13.823h6.8272v-13.879h7.0119v-7.06h7.0601v-13.8477h6.8272v-6.9878h6.9557v-7.036h7.0602v-6.787h6.787v-7.0682h7.0441v-7.028h7.0601v-6.8995-.008Z" fill="none" stroke="#000" stroke-width="13" /></g><clipPath id="etDsHKTlJvu5"><rect width="480" height="480" rx="0" ry="0" fill="#fff" /></clipPath></g></svg>
          </div>

          <div className='loading-text'>
             <p>magical</p>
             <p>things</p>
             <p>take time</p>
          </div>


          {/* <div className="icon circle circle-img1 circle-loader">
            <svg width="480" height="480" viewBox="0 0 480 480" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_2295_4621)">
                <path d="M90.4242 48.6498H104.263V41.67H111.259V34.7303H125.211V27.8228H139.026V20.7627H153.009V13.8391H173.941V6.90752H208.727V0H271.401V6.93161H306.091V13.799H326.95V20.7145H340.846V27.7505H354.91V34.65H368.709V41.5334H375.688V48.6498H389.6V55.485H396.644V62.4969H403.471V69.533H410.491V76.2959H417.455V83.3882H424.362V90.4081H431.423V104.215H438.29V111.195H445.173V125.187H452.314V138.986H459.197V152.961H466.081V173.853H473.109V215.587H479.992V264.253H473.269V305.979H466.193V326.862H459.31V340.822H452.33V354.87H445.27V368.709H438.442V375.753H431.439V382.572H424.403V396.572H417.607V403.399H410.596V410.451H403.592V417.399H396.7V424.266H382.708V431.374H375.809V438.306H368.837V445.133H355.014V452.257H340.886V459.229H327.007V466.056H306.115V473.133H264.317V480H215.723V473.213H173.989V466.185H153.17V459.302H139.058V452.346H125.259V445.286H111.412V438.394H104.303V431.447H90.5045V424.386H83.4845V417.559H76.4485V410.531H69.6213V403.511H62.5853V396.684H55.5653V389.64H48.8104V375.889H41.6861V368.749H34.7303V354.95H27.9031V340.958H20.7948V326.982H13.8713V306.123H7.0039V271.441H0V208.84H6.87539V173.981H13.7347V153.122H20.7225V139.074H27.7907V125.251H34.6179V111.372H41.6298V104.312H48.6899V90.4643H55.5171V83.4765H62.4728V76.4405H69.533V69.6535H76.32V62.5853H83.3641V55.5573H90.4242V48.6578V48.6498Z" fill="black"></path>
              </g>
              <defs>
                <clipPath id="clip0_2295_4621">
                  <rect width="480" height="480" fill="white"></rect>
                </clipPath>
              </defs>
            </svg>
          </div> */}

        </div>
        {/* <p className="clientName-text">Story</p> */}
      </div>
    </div>
  );
}
