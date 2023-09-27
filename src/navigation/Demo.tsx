/* eslint-disable no-undef */
{"config": {"adapter": ["xhr", "http"], "data": "{\"food\":{\"id\":20373,\"food_name\":\"Vada\",\"food_group\":\"Breakfast\",\"serving_size\":\"100 grams\",\"weight_in_g\":100,\"calories\":189,\"fat_in_g\":11.8,\"protein_in_g\":6.2,\"carb_in_g\":15.4,\"sugar_in_g\":0.6,\"fiber_in_g\":2.8,\"sodium_in_mg\":303.8,\"potassium_in_mg\":177.4,\"cholestrol_in_mg\":0,\"saturated_fat_in_g\":0.8,\"trans_fat_in_g\":0.1,\"monounsaturated_fat_in_g\":8.3,\"polyunsaturated_fat_in_g\":2.1,\"vitamin_a_in_mg\":null,\"vitamin_a_iu\":null,\"vitamin_a_rae_mg\":null,\"vitamin_c_in_mg\":null,\"vitamin_d_mg\":0,\"calcium_in_mg\":14,\"iron_in_mg\":1.7,\"serving_weight_1\":28,\"serving_desc_1\":\"1 oz\",\"serving_weight_2\":50,\"serving_desc_2\":\"1 piece\",\"serving_weight_3\":180,\"serving_desc_3\":\"3 pieces (mean serving weight, aggregated over brands)\",\"serving_weight_4\":null,\"serving_desc_4\":null,\"serving_weight_5\":null,\"serving_desc_5\":null,\"serving_weight_6\":null,\"serving_desc_6\":null,\"serving_weight_7\":null,\"serving_desc_7\":null,\"serving_weight_8\":null,\"serving_desc_8\":null,\"serving_weight_9\":null,\"serving_desc_9\":null,\"cal_weight_200\":105.2,\"image\":\"http://admin.fitaraise.com/storage/uploads/app_images/no_image.png\",\"is_active\":1,\"added_by\":null,\"created_at\":\"2023-03-04T17:22:44.000000Z\",\"updated_at\":\"2023-03-04T17:22:44.000000Z\",\"deleted_at\":null},\"details\":{\"totalCalorie\":\"52.92\",\"totalProtein\":\"1.74\",\"totalFat\":\"3.30\",\"totalCarb\":\"4.31\",\"totalSugar\":\"0.17\",\"totalFiber\":\"0.78\",\"totalSodium\":\"85.06\",\"totalPotassium\":\"49.67\",\"totalCholesterol\":\"0.00\",\"totalSaturatedFat\":\"0.22\",\"totalTransFat\":\"0.03\",\"totalMonounsaturatedFat\":\"2.32\",\"totalPolyunsaturatedFat\":\"0.59\",\"totalVitaminAIU\":\"0.00\",\"totalVitaminARAE\":\"0.00\",\"totalVitaminC\":\"0.00\",\"totalVitaminD\":\"0.00\",\"totalCalcium\":\"3.92\",\"totalIron\":\"0.48\",\"multiplication\":1,\"selectedDropDown\":\"1 oz (28 g)\",\"selectedWeight\":28,\"serving_desc_id\":28,\"mealType\":\"breakfast\",\"id\":20373,\"added_date\":\"2023-05-23T13:42:17.193Z\",\"meal_type\":1}}", "env": {"Blob": [Function Blob], "FormData": [Function FormData]}, "headers": [Object], "maxBodyLength": -1, "maxContentLength": -1, "method": "post", "timeout": 0, "transformRequest": [[Function transformRequest]], "transformResponse": [[Function transformResponse]], "transitional": {"clarifyTimeoutError": false, "forcedJSONParsing": true, "silentJSONParsing": true}, "url": "https://admin.fitaraise.com/public/api/add_diet_data", "validateStatus": [Function validateStatus], "xsrfCookieName": "XSRF-TOKEN", "xsrfHeaderName": "X-XSRF-TOKEN"}, "data": {"data": {"added_date": [Array], "customer_id": [Array], "desc": [Array], "food_id": [Array], "meal_type": [Array], "quantity": [Array], "serving_desc_id": [Array], "taken_weight": [Array]}, "message": "Validation Error.", "success": false}, "headers": {"access-control-allow-origin": "*", "cache-control": "no-cache, private", "connection": "Keep-Alive", "content-type": "application/json", "date": "Tue, 23 May 2023 13:42:22 GMT", "keep-alive": "timeout=5, max=100", "phpdebugbar-id": "X9e092a61672f6508aa2fdd91186e34d2", "server": "Apache/2.4.54 (Ubuntu)", "transfer-encoding": "Identity", "x-ratelimit-limit": "60", "x-ratelimit-remaining": "51"}, "request": {"DONE": 4, "HEADERS_RECEIVED": 2, "LOADING": 3, "OPENED": 1, "UNSENT": 0, "_aborted": false, "_cachedResponse": undefined, "_hasError": false, "_headers": {"accept": "application/json, text/plain, */*", "content-type": "application/json"}, "_incrementalEvents": false, "_lowerCaseResponseHeaders": {"access-control-allow-origin": "*", "cache-control": "no-cache, private", "connection": "Keep-Alive", "content-type": "application/json", "date": "Tue, 23 May 2023 13:42:22 GMT", "keep-alive": "timeout=5, max=100", "phpdebugbar-id": "X9e092a61672f6508aa2fdd91186e34d2", "server": "Apache/2.4.54 (Ubuntu)", "transfer-encoding": "Identity", "x-ratelimit-limit": "60", "x-ratelimit-remaining": "51"}, "_method": "POST", "_perfKey": "network_XMLHttpRequest_https://admin.fitaraise.com/public/api/add_diet_data", "_performanceLogger": {"_closed": false, "_extras": [Object], "_pointExtras": [Object], "_points": [Object], "_timespans": [Object]}, "_requestId": null, "_response": "{\"success\":false,\"message\":\"Validation Error.\",\"data\":{\"customer_id\":[\"The customer id field is required.\"],\"meal_type\":[\"The meal type field is required.\"],\"food_id\":[\"The food id field is required.\"],\"taken_weight\":[\"The taken weight field is required.\"],\"quantity\":[\"The quantity field is required.\"],\"serving_desc_id\":[\"The serving desc id field is required.\"],\"desc\":[\"The desc field is required.\"],\"added_date\":[\"The added date field is required.\"]}}", "_responseType": "", "_sent": true, "_subscriptions": [], "_timedOut": false, "_trackingName": "unknown", "_url": "https://admin.fitaraise.com/public/api/add_diet_data", "readyState": 4, "responseHeaders": {"Access-Control-Allow-Origin": "*", "Cache-Control": "no-cache, private", "Connection": "Keep-Alive", "Content-Type": "application/json", "Date": "Tue, 23 May 2023 13:42:22 GMT", "Keep-Alive": "timeout=5, max=100", "Server": "Apache/2.4.54 (Ubuntu)", "Transfer-Encoding": "Identity", "X-RateLimit-Limit": "60", "X-RateLimit-Remaining": "51", "phpdebugbar-id": "X9e092a61672f6508aa2fdd91186e34d2"}, "responseURL": "https://admin.fitaraise.com/public/api/add_diet_data", "status": 200, "timeout": 0, "upload": {}, "withCredentials": true}, "status": 200, "statusText": undefined}