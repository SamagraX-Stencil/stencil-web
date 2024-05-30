import React, { useEffect, useState, useMemo } from 'react'
import styles from './styles.module.css'
import { useBotAppColorPalates } from 'stencil-hooks'

function FeaturePopup() {
  const [popupData, setPopupData] = useState<any>(null)
  const [dbExists, setDbExists] = useState(false)
  const theme = useBotAppColorPalates()

  useEffect(() => {
    // Open IndexedDB database
    if (!dbExists) {
      const request = indexedDB.open('featureDetailsDB', 1) // Define request here

      request.onsuccess = function (event) {
        setDbExists(true) // If the database exists and opens successfully
      }

      request.onerror = function (event) {
        setDbExists(false) // If an error occurs or the database does not exist
      }
      request.onsuccess = (event: any) => {
        const db = event.target.result
        if (!db.objectStoreNames.contains('featureDetailsStore')) {
          console.log("featureDetailsDB doesn't exist.")
          db.close()
          return
        }

        const transaction = db.transaction('featureDetailsStore', 'readwrite')
        const objectStore = transaction.objectStore('featureDetailsStore')

        // Retrieve the entry with id: 1
        const getRequest = objectStore.get(1)
        getRequest.onsuccess = (event: any) => {
          const entry = event.target.result
          if (!entry) return
          const details = JSON.parse(entry.details)
          if (entry) {
            // Set the popup data with title and description
            setPopupData({
              title: details.title,
              description: details.description,
            })
          }
        }

        transaction.oncomplete = () => {
          db.close()
        }
      }
    }
  }, [dbExists])

  const handleClose = () => {
    if (popupData) {
      // Open IndexedDB database
      const request = indexedDB.open('featureDetailsDB', 1) // Define request here

      request.onsuccess = (event: any) => {
        const db = event.target.result
        const transaction = db.transaction('featureDetailsStore', 'readwrite')
        const objectStore = transaction.objectStore('featureDetailsStore')

        // Delete the record using the fixed key "featureDetails"
        const deleteRequest = objectStore.delete(1)

        deleteRequest.onsuccess = () => {
          console.log('Record deleted successfully')
        }

        transaction.oncomplete = () => {
          db.close()
          setPopupData(null)
        }
      }
    }
  }

  if (!popupData) {
    return null
  }

  return (
    <div
      className={styles.popup}
      style={{ backgroundColor: theme?.primary?.main }}
    >
      <h2>{popupData.title}</h2>
      <p>{popupData.description}</p>
      <button onClick={handleClose}>Close</button>
    </div>
  )
}

export default FeaturePopup
