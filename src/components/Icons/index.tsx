type Props = {
  className: string;
};
export const HashWithLookingGlass = ({ className }: Props) => (
  <svg
    className={className}
    aria-hidden="true"
    role="img"
    width="24"
    height="24"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5.00328 17.5C4.69218 17.5 4.4566 17.2189 4.51097 16.9126L4.99838 14.1667H2.26014C1.94953 14.1667 1.71409 13.8864 1.76763 13.5805L1.8843 12.9138C1.92617 12.6746 2.13392 12.5 2.37681 12.5H5.29005L6.17338 7.5H3.43514C3.12453 7.5 2.88909 7.21977 2.94263 6.91381L3.0593 6.24714C3.10117 6.00789 3.30892 5.83333 3.55181 5.83333H6.46505L6.98347 2.91262C7.02584 2.67391 7.23335 2.5 7.47578 2.5H8.12681C8.43792 2.5 8.67349 2.78107 8.61912 3.08738L8.13171 5.83333H13.1317L13.6501 2.91262C13.6925 2.67391 13.9 2.5 14.1424 2.5H14.7935C15.1046 2.5 15.3402 2.78107 15.2858 3.08738L14.7984 5.83333H17.5366C17.8472 5.83333 18.0827 6.11356 18.0291 6.41952L17.9125 7.08619C17.8706 7.32544 17.6628 7.5 17.4199 7.5H14.5067L14.2417 9H12.5754L12.8404 7.5H7.84041L6.95708 12.5H8.99835V14.1667H6.66505L6.14662 17.0874C6.10425 17.3261 5.89675 17.5 5.65431 17.5H5.00328Z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.4 14C10.4 12.0118 12.0118 10.4 14 10.4C15.9883 10.4 17.6 12.0118 17.6 14C17.6 14.7775 17.3536 15.4975 16.9345 16.0859L18.9243 18.0758C19.1586 18.3101 19.1586 18.69 18.9243 18.9243C18.69 19.1586 18.3101 19.1586 18.0758 18.9243L16.0859 16.9345C15.4975 17.3536 14.7775 17.6 14 17.6C12.0118 17.6 10.4 15.9883 10.4 14ZM14 11.6C12.6745 11.6 11.6 12.6745 11.6 14C11.6 15.3255 12.6745 16.4 14 16.4C15.3255 16.4 16.4 15.3255 16.4 14C16.4 12.6745 15.3255 11.6 14 11.6Z"
      fill="currentColor"
    />
  </svg>
);

export const Hash = ({ className }: Props) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    aria-hidden="true"
    role="img"
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.88657 21C5.57547 21 5.3399 20.7189 5.39427 20.4126L6.00001 17H2.59511C2.28449 17 2.04905 16.7198 2.10259 16.4138L2.27759 15.4138C2.31946 15.1746 2.52722 15 2.77011 15H6.35001L7.41001 9H4.00511C3.69449 9 3.45905 8.71977 3.51259 8.41381L3.68759 7.41381C3.72946 7.17456 3.93722 7 4.18011 7H7.76001L8.39677 3.41262C8.43914 3.17391 8.64664 3 8.88907 3H9.87344C10.1845 3 10.4201 3.28107 10.3657 3.58738L9.76001 7H15.76L16.3968 3.41262C16.4391 3.17391 16.6466 3 16.8891 3H17.8734C18.1845 3 18.4201 3.28107 18.3657 3.58738L17.76 7H21.1649C21.4755 7 21.711 7.28023 21.6574 7.58619L21.4824 8.58619C21.4406 8.82544 21.2328 9 20.9899 9H17.41L16.35 15H19.7549C20.0655 15 20.301 15.2802 20.2474 15.5862L20.0724 16.5862C20.0306 16.8254 19.8228 17 19.5799 17H16L15.3632 20.5874C15.3209 20.8261 15.1134 21 14.8709 21H13.8866C13.5755 21 13.3399 20.7189 13.3943 20.4126L14 17H8.00001L7.36325 20.5874C7.32088 20.8261 7.11337 21 6.87094 21H5.88657ZM9.41045 9L8.35045 15H14.3504L15.4104 9H9.41045Z"
    />
  </svg>
);
