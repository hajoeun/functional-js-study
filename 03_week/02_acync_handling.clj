(ns first.core)

(defn foo
  "I don't do a whole lot."
  [x]
  (println x "Hello, World!"))


(def post {:id 66, :title "함수형 자바스크립트 스터디", :price 10000,
             :items [
                     {:no 0, :type "text", :body "커링과 파이프라인 코딩", :id nil},
                     {:no 1, :type "photo", :url "/img/curry.png", :id 11},
                     {:no 2, :type "heading", :body "함수형으로의 전환", :id nil},
                     {:no 3, :type "photo", :url "/img/profile.jpg", :id 23}]})


(defn db_api_update [x y]
  (Thread/sleep 1000)
  (println (str "db update: " x " where : " y))
  x)

(defn db_api_insert [x]
  (Thread/sleep 2000)
  (println (str "db insert: " x ))
  x)


(->> (:items post)
     (reduce
       (fn [res item]
         (if (nil? (:id item))
           (merge-with into res {:id_nil [(dissoc item :id)]})
           (merge-with into res {:has_id [item]})))
       {:has_id [] :id_nil []})
     ((fn [items]
        (let [has_id (:has_id items) id_nil (:id_nil items)]
          (-> (pcalls
                #(doall (pmap (fn [item]
                                (db_api_update (dissoc item :id) (:id item))) has_id))
                #(db_api_insert id_nil))
              doall
              ((partial println "end : ")))))))