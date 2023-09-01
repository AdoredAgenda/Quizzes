import styles from "./Nav.module.css";

export default function Nav({ loginHandler }) {
  return (
    <div className={styles.Nav}>
      <div className={styles.left}>
        <div className={styles.img}>
          <span className={styles.avatar}>A</span>
        </div>
        <div className={styles.left__textBox}>
          <p className={styles.left__text}>Welcome Back, Admin</p>
        </div>
      </div>
      <div className={styles.search}>
        <div className={styles.search__iconBox}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="30"
            fill="none"
            viewBox="0 0 28 30"
          >
            <g clipPath="url(#clip0_31_90)">
              <path
                fill="#2F80ED"
                d="M18.083 17.412h-.921l-.327-.326a7.962 7.962 0 001.832-5.102c0-4.33-3.395-7.84-7.584-7.84-4.188 0-7.583 3.51-7.583 7.84s3.395 7.84 7.583 7.84a7.406 7.406 0 004.935-1.894l.315.338v.953l5.834 6.019 1.738-1.797-5.822-6.031zm-7 0c-2.905 0-5.25-2.425-5.25-5.428 0-3.004 2.345-5.428 5.25-5.428s5.25 2.424 5.25 5.428c0 3.003-2.345 5.428-5.25 5.428z"
              ></path>
            </g>
            <defs>
              <clipPath id="clip0_31_90">
                <path
                  fill="#fff"
                  d="M0 .525h28v18.949c0 5.523-4.477 10-10 10h-8c-5.523 0-10-4.477-10-10V.525z"
                ></path>
              </clipPath>
            </defs>
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search Here"
          className={styles.input}
        ></input>
      </div>
      <div
        className={styles.logOut}
        onClick={() => {
          loginHandler(false);
          localStorage.setItem("user", "");
          localStorage.setItem("pass", "");
          localStorage.setItem("adminJwt", "");
          localStorage.setItem("name", "");
        }}
      >
        <span className={styles.logOutText}>Log Out</span>
      </div>
    </div>
  );
}
