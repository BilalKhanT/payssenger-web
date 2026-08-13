import styles from "./Marquee.module.css";

const PHRASE =
  "No internet  /  Still banking  /  Signed on your device  /  Verified by the bank  /  Works on any phone  /  ";

/** Infinite horizontal ticker of the product's core promises. */
export function Marquee() {
  return (
    <div className={styles.band}>
      <div className={styles.track}>
        <span>{PHRASE}</span>
        <span>{PHRASE}</span>
      </div>
    </div>
  );
}
