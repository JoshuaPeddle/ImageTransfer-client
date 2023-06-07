import styles from './tos.module.css';

export default function TermsOfService() {
  return (
    <div className={styles.tosContainer}>
      <h1 className={styles.tosHeader}>Terms of Service</h1>

      <h2 className={styles.tosSection}>1. Introduction</h2>
      <p className={styles.tosText}>
        These Terms of Service govern your use of the styleswaps platform. By using, visiting, or browsing the styleswaps platform, you accept and agree to these Terms of Service.
      </p>

      <h2 className={styles.tosSection}>2. Changes to These Terms of Service</h2>
      <p className={styles.tosText}>
        styleswaps may, from time to time, change these Terms of Service. We will notify you at least 30 days before these new Terms of Service apply to you.
      </p>

      <h2 className={styles.tosSection}>3. Privacy</h2>
      <p className={styles.tosText}>
        Personal data that you provide to styleswaps is governed by our Privacy Policy.
      </p>

      <h2 className={styles.tosSection}>4. User Obligations</h2>
      <div className={styles.tosText}>
        <ol className={styles.tosList}>
          <li>You agree to use the Service in accordance with all applicable laws.</li>
          <li>You agree not to use the Service for illegal or harmful purposes.</li>
          <li>You agree not to damage or disrupt the Service.</li>
        </ol>
      </div>

      <h2 className={styles.tosSection}>5. Intellectual Property</h2>
      <p className={styles.tosText}>
        All content, design, graphics, compilation, magnetic translation, digital conversion and other matters related to the Site are protected under applicable copyrights, trademarks and other proprietary rights.
      </p>

      <h2 className={styles.tosSection}>6. Termination</h2>
      <p className={styles.tosText}>
        We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
      </p>

      <h2 className={styles.tosSection}>7. Limitation of Liability</h2>
      <p className={styles.tosText}>
        In no event shall styleswaps, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
      </p>

      <h2 className={styles.tosSection}>8. Governing Law</h2>
      <p className={styles.tosText}>
        These Terms shall be governed and construed in accordance with the laws of our country, without regard to its conflict of law provisions.
      </p>

      <h2 className={styles.tosSection}>Contact Us</h2>
      <p className={styles.tosText}>
        If you have any questions or concerns about these Terms of Service, you can contact us at our <a href="/contact">contact page</a>.
      </p>
    </div>
  );
}