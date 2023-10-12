import React from "react";

type Props = {};

export const RightClickMenu = (props: Props) => (
  <div className="relative flex-grow overflow-x-hidden overflow-y-scroll bg-neutral-900 py-1.5 pl-2">
    <div className="grid grid-cols-4 grid-rows-[1fr] items-center py-1 pb-1.5 pl-1">
      <div className="text-gray-400">
        <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-neutral-800 p-1">
          <img
            className="h-5 w-5 overflow-clip object-contain indent-[-624.94rem]"
            src="https://discord.com/assets/cb91d362742dcc886e4a4c3f981f3365.svg"
          />
        </div>
      </div>
      <div className="text-gray-400">
        <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-neutral-800 p-1">
          <img
            className="h-5 w-5 overflow-clip object-contain indent-[-624.94rem]"
            src="https://discord.com/assets/08c0a077780263f3df97613e58e71744.svg"
          />
        </div>
      </div>
      <div className="text-gray-400">
        <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-neutral-800 p-1">
          <img
            className="h-5 w-5 overflow-clip object-contain indent-[-624.94rem]"
            src="https://discord.com/assets/db009c8fa13d0f303df266e9d42c8e30.svg"
          />
        </div>
      </div>
      <div className="text-gray-400">
        <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-neutral-800 p-1">
          <img
            className="h-5 w-5 overflow-clip object-contain indent-[-624.94rem]"
            src="https://discord.com/assets/b052a4bef57c1aa73cd7cff5bc4fb61d.svg"
          />
        </div>
      </div>
    </div>
    <div>
      <div>
        <div className="my-1 flex min-h-[2.00rem] cursor-pointer items-center justify-between rounded-sm bg-indigo-700 px-2 py-1.5 text-sm font-medium text-white">
          <div className="flex-grow overflow-hidden text-ellipsis">
            Add Reaction
          </div>
          <div className="ml-2 h-5 w-5">
            <svg
              aria-hidden="true"
              className="inline h-3 w-3"
              fill="rgb(0, 0, 0)"
              height="24"
              role="img"
              viewBox="0 0 24 24"
              width="24"
            >
              <g fill="none" fillRule="evenodd">
                <polygon
                  fill="rgb(255, 255, 255)"
                  fillRule="nonzero"
                  points="8.47 2 6.12 4.35 13.753 12 6.12 19.65 8.47 22 18.47 12"
                />
                <polygon fill="none" points="0 0 24 0 24 24 0 24" />
              </g>
            </svg>
          </div>
        </div>
        <div className="fixed bottom-[0.75rem] left-[70.00rem] right-[6.88rem] top-[37.31rem] bg-neutral-900">
          <div className="px-2">
            <div className="flex h-auto rounded">
              <div className="relative flex-grow overflow-x-hidden overflow-y-scroll py-1.5 pl-2">
                <div className="my-1 flex min-h-[2.00rem] cursor-pointer items-center justify-between rounded-sm px-2 py-1.5 text-sm font-medium text-gray-400">
                  <div className="flex-grow overflow-hidden text-ellipsis">
                    laughing
                  </div>
                  <div className="ml-2">
                    <img
                      className="h-5 w-5 overflow-clip indent-[-624.94rem]"
                      src="https://discord.com/assets/cb91d362742dcc886e4a4c3f981f3365.svg"
                    />
                  </div>
                </div>
                <div className="my-1 flex min-h-[2.00rem] cursor-pointer items-center justify-between rounded-sm px-2 py-1.5 text-sm font-medium text-gray-400">
                  <div className="flex-grow overflow-hidden text-ellipsis">
                    thumbsup
                  </div>
                  <div className="ml-2">
                    <img
                      className="h-5 w-5 overflow-clip indent-[-624.94rem]"
                      src="https://discord.com/assets/08c0a077780263f3df97613e58e71744.svg"
                    />
                  </div>
                </div>
                <div className="my-1 flex min-h-[2.00rem] cursor-pointer items-center justify-between rounded-sm px-2 py-1.5 text-sm font-medium text-gray-400">
                  <div className="flex-grow overflow-hidden text-ellipsis">
                    100
                  </div>
                  <div className="ml-2">
                    <img
                      className="h-5 w-5 overflow-clip indent-[-624.94rem]"
                      src="https://discord.com/assets/db009c8fa13d0f303df266e9d42c8e30.svg"
                    />
                  </div>
                </div>
                <div className="my-1 flex min-h-[2.00rem] cursor-pointer items-center justify-between rounded-sm px-2 py-1.5 text-sm font-medium text-gray-400">
                  <div className="flex-grow overflow-hidden text-ellipsis">
                    tada
                  </div>
                  <div className="ml-2">
                    <img
                      className="h-5 w-5 overflow-clip indent-[-624.94rem]"
                      src="https://discord.com/assets/b052a4bef57c1aa73cd7cff5bc4fb61d.svg"
                    />
                  </div>
                </div>
                <div className="my-1 flex min-h-[2.00rem] cursor-pointer items-center justify-between rounded-sm px-2 py-1.5 text-sm font-medium text-gray-400">
                  <div className="flex-grow overflow-hidden text-ellipsis">
                    point_up_2
                  </div>
                  <div className="ml-2">
                    <img
                      className="h-5 w-5 overflow-clip indent-[-624.94rem]"
                      src="https://discord.com/assets/863d47ae4fdda4d783c57dd9c496b7d6.svg"
                    />
                  </div>
                </div>
                <div className="my-1 flex min-h-[2.00rem] cursor-pointer items-center justify-between rounded-sm px-2 py-1.5 text-sm font-medium text-gray-400">
                  <div className="flex-grow overflow-hidden text-ellipsis">
                    cry
                  </div>
                  <div className="ml-2">
                    <img
                      className="h-5 w-5 overflow-clip indent-[-624.94rem]"
                      src="https://discord.com/assets/f6d30507f4baee759bc9d7e5c0d3ba4f.svg"
                    />
                  </div>
                </div>
                <div className="my-1 flex min-h-[2.00rem] cursor-pointer items-center justify-between rounded-sm px-2 py-1.5 text-sm font-medium text-gray-400">
                  <div className="flex-grow overflow-hidden text-ellipsis">
                    man_shrugging
                  </div>
                  <div className="ml-2">
                    <img
                      className="h-5 w-5 overflow-clip indent-[-624.94rem]"
                      src="https://discord.com/assets/8bb32bd487f28959e88250de4794153a.svg"
                    />
                  </div>
                </div>
                <div className="my-1 flex min-h-[2.00rem] cursor-pointer items-center justify-between rounded-sm px-2 py-1.5 text-sm font-medium text-gray-400">
                  <div className="flex-grow overflow-hidden text-ellipsis">
                    eyes
                  </div>
                  <div className="ml-2">
                    <img
                      className="h-5 w-5 overflow-clip indent-[-624.94rem]"
                      src="https://discord.com/assets/4c5a77a89716352686f590a6f014770c.svg"
                    />
                  </div>
                </div>
                <div className="my-1 flex min-h-[2.00rem] cursor-pointer items-center justify-between rounded-sm px-2 py-1.5 text-sm font-medium text-gray-400">
                  <div className="flex-grow overflow-hidden text-ellipsis">
                    heart
                  </div>
                  <div className="ml-2">
                    <img
                      className="h-5 w-5 overflow-clip indent-[-624.94rem]"
                      src="https://discord.com/assets/0483f2b648dcc986d01385062052ae1c.svg"
                    />
                  </div>
                </div>
                <div className="my-1 flex min-h-[2.00rem] cursor-pointer items-center justify-between rounded-sm px-2 py-1.5 text-sm font-medium text-gray-400">
                  <div className="flex-grow overflow-hidden text-ellipsis">
                    rofl
                  </div>
                  <div className="ml-2">
                    <img
                      className="h-5 w-5 overflow-clip indent-[-624.94rem]"
                      src="https://discord.com/assets/567230faa19ec889fad5613630597049.svg"
                    />
                  </div>
                </div>
                <div className="my-1 flex min-h-[2.00rem] cursor-pointer items-center justify-between rounded-sm px-2 py-1.5 text-sm font-medium text-gray-400">
                  <div className="flex-grow overflow-hidden text-ellipsis">
                    white_check_mark
                  </div>
                  <div className="ml-2">
                    <img
                      className="h-5 w-5 overflow-clip indent-[-624.94rem]"
                      src="https://discord.com/assets/212e30e47232be03033a87dc58edaa95.svg"
                    />
                  </div>
                </div>
                <div className="my-1 flex min-h-[2.00rem] cursor-pointer items-center justify-between rounded-sm px-2 py-1.5 text-sm font-medium text-gray-400">
                  <div className="flex-grow overflow-hidden text-ellipsis">
                    star
                  </div>
                  <div className="ml-2">
                    <img
                      className="h-5 w-5 overflow-clip indent-[-624.94rem]"
                      src="https://discord.com/assets/141d49436743034a59dec6bd5618675d.svg"
                    />
                  </div>
                </div>
                <div className="my-1 flex min-h-[2.00rem] cursor-pointer items-center justify-between rounded-sm px-2 py-1.5 text-sm font-medium text-gray-400">
                  <div className="flex-grow overflow-hidden text-ellipsis">
                    View More
                  </div>
                  <div className="ml-2 h-5 w-5">
                    <svg
                      aria-hidden="true"
                      className="inline"
                      fill="rgb(0, 0, 0)"
                      height="18"
                      role="img"
                      viewBox="0 0 24 24"
                      width="18"
                    >
                      <path
                        clipRule="evenodd"
                        d="M12.1151 2.00065C12.0768 2.00022 12.0384 2 12 2C6.477 2 2 6.477 2 12C2 17.522 6.477 22 12 22C17.523 22 22 17.522 22 12C22 11.9616 21.9998 11.9232 21.9993 11.8849C21.1882 12.1737 20.3146 12.3309 19.4043 12.3309C15.1323 12.3309 11.6691 8.86771 11.6691 4.59565C11.6691 3.68536 11.8263 2.8118 12.1151 2.00065ZM7.92105 11.8023C7.92105 12.7107 7.18468 13.4471 6.27631 13.4471C5.36795 13.4471 4.63158 12.7107 4.63158 11.8023C4.63158 10.894 5.36795 10.1576 6.27631 10.1576C7.18467 10.1576 7.92105 10.894 7.92105 11.8023ZM10.5217 14.5171C10.3859 13.9893 9.84786 13.6716 9.32005 13.8074C8.79223 13.9433 8.47448 14.4813 8.61033 15.0091C9.01196 16.5695 10.4273 17.7236 12.1147 17.7236C13.8021 17.7236 15.2174 16.5695 15.6191 15.0091C15.7549 14.4813 15.4372 13.9433 14.9093 13.8074C14.3815 13.6716 13.8435 13.9893 13.7077 14.5171C13.525 15.2267 12.8797 15.7499 12.1147 15.7499C11.3497 15.7499 10.7044 15.2267 10.5217 14.5171Z"
                        fill="rgb(181, 186, 193)"
                        fillRule="evenodd"
                      />
                      <path
                        d="M18.5 2C17.9477 2 17.5 2.44772 17.5 3V4.5H16C15.4477 4.5 15 4.94771 15 5.5C15 6.05228 15.4477 6.5 16 6.5H17.5V8C17.5 8.55228 17.9477 9 18.5 9C19.0523 9 19.5 8.55229 19.5 8V6.5H21C21.5523 6.5 22 6.05229 22 5.5C22 4.94772 21.5523 4.5 21 4.5H19.5V3C19.5 2.44772 19.0523 2 18.5 2Z"
                        fill="rgb(181, 186, 193)"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="my-1 flex min-h-[2.00rem] cursor-pointer items-center justify-between rounded-sm px-2 py-1.5 text-sm font-medium text-gray-400">
          <div className="flex-grow overflow-hidden text-ellipsis">
            Add Super Reaction
          </div>
          <div className="ml-2 h-5 w-5">
            <svg
              aria-hidden="true"
              className="inline"
              fill="rgb(0, 0, 0)"
              height="24"
              role="img"
              viewBox="0 0 24 24"
              width="24"
            >
              <path
                d="M2.98966977,9.35789159 C2.98966977,9.77582472 2.63442946,10.1240466 2.20807287,10.1240466 L1.78171628,10.1240466 C1.35535969,10.1240466 0.999948837,9.77582472 0.999948837,9.35789159 C0.999948837,8.93995846 1.35535969,8.59173658 1.78171628,8.59173658 L2.20807287,8.59173658 C2.63442946,8.59173658 2.98966977,8.93995846 2.98966977,9.35789159 Z M22.2467643,9.14892503 C24.0942527,12.9800344 22.3888264,17.5772989 18.3384388,19.3882867 C14.4302837,21.1297305 9.74036124,19.457998 7.9638186,15.6268886 C7.60857829,14.8607335 7.3954,14.0248673 7.32428372,13.189001 L5.76091938,13.189001 C5.33456279,13.189001 4.97932248,12.840612 4.97932248,12.4226788 C4.97932248,12.0047457 5.33456279,11.6565238 5.76091938,11.6565238 L8.03493488,11.6565238 C8.46129147,11.6565238 8.81653178,11.3083019 8.81653178,10.8903688 C8.81653178,10.4724357 8.46129147,10.1240466 8.03493488,10.1240466 L4.41090388,10.1240466 C3.98454729,10.1240466 3.62913643,9.77582472 3.62913643,9.35789159 C3.62913643,8.93995846 3.98454729,8.59173658 4.41090388,8.59173658 L9.45606667,8.59173658 C9.88242326,8.59173658 10.2376636,8.24334752 10.2376636,7.82541439 C10.2376636,7.40748126 9.88242326,7.05925937 9.45606667,7.05925937 L7.3954,7.05925937 C6.75586512,7.05925937 6.18727597,6.57161499 6.18727597,5.87517123 C6.18727597,5.24827153 6.68474884,4.69091591 7.3954,4.69091591 L15.4250589,4.69091591 C18.267493,4.8303384 20.9676946,6.43235968 22.2467643,9.14892503 Z M13.2662961,8.38056332 C11.0193969,9.3919615 10.0341721,11.9973566 11.065955,14.1998642 C12.097738,16.4023718 14.755645,17.3681317 17.0025442,16.3567335 C19.249614,15.3453354 20.2346682,12.7399402 19.2028853,10.5374326 C18.1711023,8.33492503 15.5131953,7.36916515 13.2662961,8.38056332 Z M16.8462589,9.84548582 L18.2673907,12.2138293 C18.338507,12.3530846 18.338507,12.4227958 18.2673907,12.5620512 L16.8462589,14.9303946 C16.7751426,15.0696499 16.6330806,15.0696499 16.5619643,15.0696499 L13.7906465,15.0696499 C13.6485845,15.0696499 13.5774682,14.9999387 13.5065225,14.9303946 L12.0852202,12.5620512 C12.0142744,12.4227958 12.0142744,12.3530846 12.0852202,12.2138293 L13.5065225,9.84548582 C13.5774682,9.7062305 13.7197008,9.7062305 13.7906465,9.7062305 L16.5619643,9.7062305 C16.7041969,9.63651925 16.7751426,9.7062305 16.8462589,9.84548582 Z"
                fill="rgb(181, 186, 193)"
              />
            </svg>
          </div>
          <div className="ml-2 h-5 w-5">
            <svg
              aria-hidden="true"
              className="inline h-3 w-3 text-zinc-400"
              fill="rgb(0, 0, 0)"
              height="24"
              role="img"
              viewBox="0 0 24 24"
              width="24"
            >
              <g fill="none" fillRule="evenodd">
                <polygon
                  fill="rgb(148, 155, 164)"
                  fillRule="nonzero"
                  points="8.47 2 6.12 4.35 13.753 12 6.12 19.65 8.47 22 18.47 12"
                />
                <polygon fill="none" points="0 0 24 0 24 24 0 24" />
              </g>
            </svg>
          </div>
        </div>
      </div>
      <div className="my-1 flex min-h-[2.00rem] cursor-pointer items-center justify-between rounded-sm px-2 py-1.5 text-sm font-medium text-gray-400">
        <div className="flex-grow overflow-hidden text-ellipsis">
          Edit Message
        </div>
        <div className="ml-2 h-5 w-5">
          <svg
            aria-hidden="true"
            className="inline"
            fill="rgb(0, 0, 0)"
            height="16"
            role="img"
            viewBox="0 0 24 24"
            width="16"
          >
            <path
              clipRule="evenodd"
              d="M19.2929 9.8299L19.9409 9.18278C21.353 7.77064 21.353 5.47197 19.9409 4.05892C18.5287 2.64678 16.2292 2.64678 14.817 4.05892L14.1699 4.70694L19.2929 9.8299ZM12.8962 5.97688L5.18469 13.6906L10.3085 18.813L18.0201 11.0992L12.8962 5.97688ZM4.11851 20.9704L8.75906 19.8112L4.18692 15.239L3.02678 19.8796C2.95028 20.1856 3.04028 20.5105 3.26349 20.7337C3.48669 20.9569 3.8116 21.046 4.11851 20.9704Z"
              fill="rgb(181, 186, 193)"
              fillRule="evenodd"
            />
          </svg>
        </div>
      </div>
      <div className="my-1 flex min-h-[2.00rem] cursor-pointer items-center justify-between rounded-sm px-2 py-1.5 text-sm font-medium text-gray-400">
        <div className="flex-grow overflow-hidden text-ellipsis">
          Pin Message
        </div>
        <div className="ml-2 h-5 w-5">
          <svg
            aria-hidden="true"
            className="inline"
            fill="rgb(0, 0, 0)"
            height="24"
            role="img"
            viewBox="0 0 24 24"
            width="24"
          >
            <path
              d="M22 12L12.101 2.10101L10.686 3.51401L12.101 4.92901L7.15096 9.87801V9.88001L5.73596 8.46501L4.32196 9.88001L8.56496 14.122L2.90796 19.778L4.32196 21.192L9.97896 15.536L14.222 19.778L15.636 18.364L14.222 16.95L19.171 12H19.172L20.586 13.414L22 12Z"
              fill="rgb(181, 186, 193)"
            />
          </svg>
        </div>
      </div>
      <div className="my-1 flex min-h-[2.00rem] cursor-pointer items-center justify-between rounded-sm px-2 py-1.5 text-sm font-medium text-gray-400">
        <div className="flex-grow overflow-hidden text-ellipsis">Reply</div>
        <div className="ml-2 h-5 w-5">
          <svg
            className="inline"
            fill="rgb(0, 0, 0)"
            height="24"
            viewBox="0 0 24 24"
            width="24"
          >
            <path
              d="M10 8.26667V4L3 11.4667L10 18.9333V14.56C15 14.56 18.5 16.2667 21 20C20 14.6667 17 9.33333 10 8.26667Z"
              fill="rgb(181, 186, 193)"
            />
          </svg>
        </div>
      </div>
      <div className="my-1 flex min-h-[2.00rem] cursor-pointer items-center justify-between rounded-sm px-2 py-1.5 text-sm font-medium text-gray-400">
        <div className="flex-grow overflow-hidden text-ellipsis">
          Create Thread
        </div>
        <div className="ml-2 h-5 w-5">
          <svg
            aria-hidden="true"
            className="inline"
            fill="none"
            height="24"
            role="img"
            viewBox="0 0 24 24"
            width="24"
          >
            <path
              d="M5.43309 21C5.35842 21 5.30189 20.9325 5.31494 20.859L5.99991 17H2.14274C2.06819 17 2.01168 16.9327 2.02453 16.8593L2.33253 15.0993C2.34258 15.0419 2.39244 15 2.45074 15H6.34991L7.40991 9H3.55274C3.47819 9 3.42168 8.93274 3.43453 8.85931L3.74253 7.09931C3.75258 7.04189 3.80244 7 3.86074 7H7.75991L8.45234 3.09903C8.46251 3.04174 8.51231 3 8.57049 3H10.3267C10.4014 3 10.4579 3.06746 10.4449 3.14097L9.75991 7H15.7599L16.4523 3.09903C16.4625 3.04174 16.5123 3 16.5705 3H18.3267C18.4014 3 18.4579 3.06746 18.4449 3.14097L17.7599 7H21.6171C21.6916 7 21.7481 7.06725 21.7353 7.14069L21.4273 8.90069C21.4172 8.95811 21.3674 9 21.3091 9H17.4099L17.0495 11.04H15.05L15.4104 9H9.41035L8.35035 15H10.5599V17H7.99991L7.30749 20.901C7.29732 20.9583 7.24752 21 7.18934 21H5.43309Z"
              fill="rgb(181, 186, 193)"
            />
            <path
              d="M13.4399 12.96C12.9097 12.96 12.4799 13.3898 12.4799 13.92V20.2213C12.4799 20.7515 12.9097 21.1813 13.4399 21.1813H14.3999C14.5325 21.1813 14.6399 21.2887 14.6399 21.4213V23.4597C14.6399 23.6677 14.8865 23.7773 15.0408 23.6378L17.4858 21.4289C17.6622 21.2695 17.8916 21.1813 18.1294 21.1813H22.5599C23.0901 21.1813 23.5199 20.7515 23.5199 20.2213V13.92C23.5199 13.3898 23.0901 12.96 22.5599 12.96H13.4399Z"
              fill="rgb(181, 186, 193)"
            />
          </svg>
        </div>
      </div>
      <div className="my-1 flex min-h-[2.00rem] cursor-pointer items-center justify-between rounded-sm px-2 py-1.5 text-sm font-medium text-gray-400">
        <div className="flex-grow overflow-hidden text-ellipsis">Copy Text</div>
        <div className="ml-2 h-5 w-5">
          <svg
            aria-hidden="true"
            className="inline"
            fill="rgb(0, 0, 0)"
            height="16"
            role="img"
            viewBox="0 0 24 24"
            width="16"
          >
            <g fill="rgb(181, 186, 193)">
              <path
                d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1z"
                fill="rgb(181, 186, 193)"
              />
              <path
                d="M15 5H8c-1.1 0-1.99.9-1.99 2L6 21c0 1.1.89 2 1.99 2H19c1.1 0 2-.9 2-2V11l-6-6zM8 21V7h6v5h5v9H8z"
                fill="rgb(181, 186, 193)"
              />
            </g>
          </svg>
        </div>
      </div>
      <div className="my-1 flex min-h-[2.00rem] cursor-pointer items-center justify-between rounded-sm px-2 py-1.5 text-sm font-medium text-gray-400">
        <div className="flex-grow overflow-hidden text-ellipsis">
          Mark Unread
        </div>
        <div className="ml-2 h-5 w-5">
          <svg
            aria-hidden="true"
            className="inline"
            fill="rgb(0, 0, 0)"
            height="24"
            role="img"
            viewBox="0 0 24 24"
            width="24"
          >
            <path
              d="M14 3H20C21 3 22.0001 4 22.0001 5V19.0003C22.0001 20 21 21 20 21H14C13 21 6 13 6 13H2V11H6C6 11 13 3 14 3Z"
              fill="rgb(181, 186, 193)"
            />
          </svg>
        </div>
      </div>
      <div className="my-1 flex min-h-[2.00rem] cursor-pointer items-center justify-between rounded-sm px-2 py-1.5 text-sm font-medium text-gray-400">
        <div className="flex-grow overflow-hidden text-ellipsis">
          Copy Message Link
        </div>
        <div className="ml-2 h-5 w-5">
          <svg
            aria-hidden="true"
            className="inline"
            fill="rgb(0, 0, 0)"
            height="24"
            role="img"
            viewBox="0 0 24 24"
            width="24"
          >
            <g fill="none" fillRule="evenodd">
              <path
                d="M10.59 13.41c.41.39.41 1.03 0 1.42-.39.39-1.03.39-1.42 0a5.003 5.003 0 0 1 0-7.07l3.54-3.54a5.003 5.003 0 0 1 7.07 0 5.003 5.003 0 0 1 0 7.07l-1.49 1.49c.01-.82-.12-1.64-.4-2.42l.47-.48a2.982 2.982 0 0 0 0-4.24 2.982 2.982 0 0 0-4.24 0l-3.53 3.53a2.982 2.982 0 0 0 0 4.24zm2.82-4.24c.39-.39 1.03-.39 1.42 0a5.003 5.003 0 0 1 0 7.07l-3.54 3.54a5.003 5.003 0 0 1-7.07 0 5.003 5.003 0 0 1 0-7.07l1.49-1.49c-.01.82.12 1.64.4 2.43l-.47.47a2.982 2.982 0 0 0 0 4.24 2.982 2.982 0 0 0 4.24 0l3.53-3.53a2.982 2.982 0 0 0 0-4.24.973.973 0 0 1 0-1.42z"
                fill="rgb(181, 186, 193)"
              />
              <rect fill="none" height="24" width="24" />
            </g>
          </svg>
        </div>
      </div>
      <div className="my-1 flex min-h-[2.00rem] cursor-pointer items-center justify-between rounded-sm px-2 py-1.5 text-sm font-medium text-gray-400">
        <div className="flex-grow overflow-hidden text-ellipsis">
          Speak Message
        </div>
        <div className="ml-2 h-5 w-5">
          <svg
            aria-hidden="true"
            className="inline"
            fill="rgb(0, 0, 0)"
            height="24"
            role="img"
            viewBox="0 0 24 24"
            width="24"
          >
            <path
              clipRule="evenodd"
              d="M2.99805 4.8C2.99805 3.8055 3.80445 3 4.79805 3H19.198C20.1925 3 20.998 3.8055 20.998 4.8V15.6C20.998 16.5936 20.1925 17.4 19.198 17.4H11.098L7.49805 21V17.4H4.79805C3.80445 17.4 2.99805 16.5936 2.99805 15.6V4.8ZM11.5737 5.16264C11.7336 5.00375 11.9739 4.95652 12.183 5.04208C12.3921 5.12708 12.5279 5.33098 12.5279 5.55487V14.444C12.5279 14.669 12.3921 14.8718 12.183 14.9579C11.9739 15.0435 11.7336 14.9963 11.5737 14.8374L9.1739 12.2217H7.4969C7.18945 12.2217 6.9379 11.9717 6.9379 11.6662V8.33273C6.9379 8.02772 7.18945 7.77716 7.4969 7.77716H9.1739L11.5737 5.16264ZM13.6459 7.22159V6.11044C15.8037 6.11044 17.5589 7.85549 17.5589 9.99944C17.5589 12.1445 15.8037 13.8884 13.6459 13.8884V12.7773C15.1871 12.7773 16.4409 11.5312 16.4409 9.99944C16.4409 8.46829 15.1871 7.22159 13.6459 7.22159ZM15.3229 9.99944C15.3229 9.08108 14.5705 8.33273 13.6459 8.33273V9.44387C13.9539 9.44387 14.2049 9.69332 14.2049 9.99944C14.2049 10.3056 13.9539 10.555 13.6459 10.555V11.6662C14.5705 11.6662 15.3229 10.9189 15.3229 9.99944Z"
              fill="rgb(181, 186, 193)"
              fillRule="evenodd"
            />
          </svg>
        </div>
      </div>
      <div className="my-1 flex min-h-[2.00rem] cursor-pointer items-center justify-between rounded-sm px-2 py-1.5 text-sm font-medium text-red-500">
        <div className="flex-grow overflow-hidden text-ellipsis">
          Delete Message
        </div>
        <div className="ml-2 h-5 w-5">
          <svg
            aria-hidden="true"
            className="inline"
            fill="rgb(0, 0, 0)"
            height="24"
            role="img"
            viewBox="0 0 24 24"
            width="24"
          >
            <path
              d="M15 3.999V2H9V3.999H3V5.999H21V3.999H15Z"
              fill="rgb(242, 63, 66)"
            />
            <path
              d="M5 6.99902V18.999C5 20.101 5.897 20.999 7 20.999H17C18.103 20.999 19 20.101 19 18.999V6.99902H5ZM11 17H9V11H11V17ZM15 17H13V11H15V17Z"
              fill="rgb(242, 63, 66)"
            />
          </svg>
        </div>
      </div>
    </div>
    <div>
      <div className="my-1 flex min-h-[2.00rem] cursor-pointer items-center justify-between rounded-sm px-2 py-1.5 text-sm font-medium text-gray-400">
        <div className="flex-grow overflow-hidden text-ellipsis">
          Copy Message ID
        </div>
        <div className="ml-2 h-5 w-5">
          <svg
            aria-hidden="true"
            className="inline"
            fill="rgb(0, 0, 0)"
            height="24"
            role="img"
            viewBox="0 0 24 24"
            width="24"
          >
            <path
              clipRule="evenodd"
              d="M3.37868 2.87868C3.94129 2.31607 4.70435 2 5.5 2H19.5C20.2956 2 21.0587 2.31607 21.6213 2.87868C22.1839 3.44129 22.5 4.20435 22.5 5V19C22.5 19.7956 22.1839 20.5587 21.6213 21.1213C21.0587 21.6839 20.2956 22 19.5 22H5.5C4.70435 22 3.94129 21.6839 3.37868 21.1213C2.81607 20.5587 2.5 19.7956 2.5 19V5C2.5 4.20435 2.81607 3.44129 3.37868 2.87868ZM7.65332 16.3125H9.47832V7.6875H7.65332V16.3125ZM11.23 7.6875V16.3125H14.2925C15.6008 16.3125 16.6091 15.9417 17.3175 15.2C18.0341 14.4583 18.3925 13.3917 18.3925 12C18.3925 10.6083 18.0341 9.54167 17.3175 8.8C16.6091 8.05833 15.6008 7.6875 14.2925 7.6875H11.23ZM15.955 14.0625C15.5466 14.4625 14.9925 14.6625 14.2925 14.6625H13.055V9.3375H14.2925C14.9925 9.3375 15.5466 9.5375 15.955 9.9375C16.3633 10.3375 16.5675 11.025 16.5675 12C16.5675 12.975 16.3633 13.6625 15.955 14.0625Z"
              fill="rgb(181, 186, 193)"
              fillRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
);
