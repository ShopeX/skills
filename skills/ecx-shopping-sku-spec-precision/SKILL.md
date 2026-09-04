---
name: ecx-shopping-sku-spec-precision
description: "ECX电商场景：运行时 JSON：购买意图中的规格别名、归一化、前缀剥离和匹配阈值；不注入 LLM prompt。。用于用户询问相关业务能力时；不用于无关产品或超出正文边界的操作。 Use when users request this capability."
---

{"version":1,"categories":[{"code":"color","names":["颜色","色号","color"],"aliases":{"白色":["白","白色","月光白","雪山白"],"黑色":["黑","黑色","曜石黑","经典黑"],"黄色":["黄","黄色","明黄"]},"normalization":[]},{"code":"storage","names":["容量","存储","内存"],"aliases":{},"normalization":[{"pattern":"(?i)256\\s*(g|gb)","value":"256G"},{"pattern":"(?i)512\\s*(g|gb)","value":"512G"},{"pattern":"(?i)1\\s*(t|tb)","value":"1T"}]},{"code":"size","names":["尺码","尺寸","size"],"aliases":{"XL":["XL","加大码","大码"],"L":["L","大号"],"M":["M","中号"]},"normalization":[]}],"model_prefix_strip":["我要买","我想买","帮我买","帮我找","推荐","来一件"],"thresholds":{"min_match_score":2,"size_match_score":3,"keyword_match_score":2,"max_product_model_length":40},"product_model":{"normalization":[{"pattern":"防风衣","value":"防风冲锋衣"}],"token_groups":[{"code":"outerwear","terms":["冲锋衣","防风衣","风衣","外套","夹克"]},{"code":"footwear","terms":["鞋","靴"]},{"code":"bag","terms":["包"]},{"code":"hat","terms":["帽"]},{"code":"features","terms":["防风","防水","保暖","透气","耐磨","户外","运动"]}]}}
